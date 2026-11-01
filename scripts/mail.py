#!/usr/bin/env python3
"""
Local helper for the privacy@axivai.com mailbox (Hostinger Email).

Reads AXIVAI_MAIL_USER and AXIVAI_MAIL_PASSWORD from the project .env and never prints the password.
Not used by the website.

  python3 -I scripts/mail.py check                         # test the login
  python3 -I scripts/mail.py inbox [N]                     # list the N newest messages (default 10)
  python3 -I scripts/mail.py read UID                      # print one message as plain text
  python3 -I scripts/mail.py send TO SUBJECT BODY_FILE     # send a plain-text message
"""

import email
import imaplib
import smtplib
import ssl
import sys
from email.header import decode_header, make_header
from email.message import EmailMessage
from email.utils import formatdate, make_msgid
from pathlib import Path

IMAP_HOST, IMAP_PORT = "imap.hostinger.com", 993
SMTP_HOST, SMTP_PORT = "smtp.hostinger.com", 465
ENV_FILE = Path(__file__).resolve().parent.parent / ".env"


def load_credentials() -> tuple[str, str]:
    values: dict[str, str] = {}
    for line in ENV_FILE.read_text().splitlines():
        if "=" in line and not line.lstrip().startswith("#"):
            key, _, val = line.partition("=")
            values[key.strip()] = val.strip().strip('"').strip("'")
    user, password = values.get("AXIVAI_MAIL_USER", ""), values.get("AXIVAI_MAIL_PASSWORD", "")
    if not user or not password:
        sys.exit("AXIVAI_MAIL_USER and AXIVAI_MAIL_PASSWORD must be set in .env")
    return user, password


def imap() -> imaplib.IMAP4_SSL:
    user, password = load_credentials()
    conn = imaplib.IMAP4_SSL(IMAP_HOST, IMAP_PORT, ssl_context=ssl.create_default_context())
    try:
        conn.login(user, password)
    except imaplib.IMAP4.error:
        sys.exit("Login failed: check AXIVAI_MAIL_USER and AXIVAI_MAIL_PASSWORD in .env")
    return conn


def text(value: str | None) -> str:
    return str(make_header(decode_header(value))) if value else ""


def cmd_check() -> None:
    conn = imap()
    _, data = conn.select("INBOX", readonly=True)
    print(f"Login OK. INBOX has {data[0].decode()} messages.")
    conn.logout()


def cmd_inbox(limit: int = 10) -> None:
    conn = imap()
    conn.select("INBOX", readonly=True)
    _, data = conn.uid("search", None, "ALL")
    uids = data[0].split()[-limit:]
    for uid in reversed(uids):
        _, msg_data = conn.uid("fetch", uid, "(BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE)])")
        msg = email.message_from_bytes(msg_data[0][1])
        print(f"{uid.decode():>6}  {text(msg['Date'])[:25]:25}  {text(msg['From'])[:40]:40}  {text(msg['Subject'])}")
    conn.logout()


def cmd_read(uid: str) -> None:
    conn = imap()
    conn.select("INBOX", readonly=True)
    _, msg_data = conn.uid("fetch", uid, "(BODY.PEEK[])")
    msg = email.message_from_bytes(msg_data[0][1])
    for h in ("From", "To", "Date", "Subject"):
        print(f"{h}: {text(msg[h])}")
    print()
    part = msg.get_body(preferencelist=("plain", "html")) if hasattr(msg, "get_body") else None
    if part is None:
        for p in msg.walk():
            if p.get_content_type() == "text/plain":
                part = p
                break
    payload = part.get_payload(decode=True) if part else b""
    print(payload.decode(part.get_content_charset() or "utf-8", "replace") if part else "(no text body)")
    conn.logout()


def cmd_send(to: str, subject: str, body_file: str) -> None:
    user, password = load_credentials()
    msg = EmailMessage()
    msg["From"], msg["To"], msg["Subject"] = user, to, subject
    msg["Date"], msg["Message-ID"] = formatdate(localtime=True), make_msgid(domain="axivai.com")
    msg.set_content(Path(body_file).read_text())
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=ssl.create_default_context()) as smtp:
        smtp.login(user, password)
        smtp.send_message(msg)
    print(f"Sent to {to}: {subject}")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args or args[0] not in {"check", "inbox", "read", "send"}:
        sys.exit(__doc__)
    if args[0] == "check":
        cmd_check()
    elif args[0] == "inbox":
        cmd_inbox(int(args[1]) if len(args) > 1 else 10)
    elif args[0] == "read" and len(args) == 2:
        cmd_read(args[1])
    elif args[0] == "send" and len(args) == 4:
        cmd_send(args[1], args[2], args[3])
    else:
        sys.exit(__doc__)
