"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { FleetProfile, LocationProfile } from "@/types/tco";

interface FleetInputFormProps {
  fleet: FleetProfile;
  location: LocationProfile;
  onFleetChange: (fleet: FleetProfile) => void;
  onLocationChange: (location: LocationProfile) => void;
}

const US_STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" }, { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
  { code: "DC", name: "District of Columbia" },
];

export function FleetInputForm({
  fleet,
  location,
  onFleetChange,
  onLocationChange,
}: FleetInputFormProps) {
  const totalBuses = fleet.typeACount + fleet.typeCCount + fleet.typeDCount;

  const updateFleet = (updates: Partial<FleetProfile>) => {
    onFleetChange({ ...fleet, ...updates });
  };

  const updateLocation = (updates: Partial<LocationProfile>) => {
    onLocationChange({ ...location, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">District Location</CardTitle>
          <CardDescription>
            Location affects electricity rates, diesel prices, and weather adjustments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={location.state}
                onValueChange={(value) => updateLocation({ state: value })}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code (Optional)</Label>
              <Input
                id="zipCode"
                placeholder="12345"
                value={location.zipCode || ""}
                onChange={(e) => updateLocation({ zipCode: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fleet Composition */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Fleet Composition
            <Badge variant="secondary" className="text-base">
              {totalBuses} buses
            </Badge>
          </CardTitle>
          <CardDescription>
            Enter the number of buses by type in your fleet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="typeA" className="flex items-center gap-2">
                Type A
                <span className="text-xs text-muted-foreground">(Small)</span>
              </Label>
              <Input
                id="typeA"
                type="number"
                min="0"
                value={fleet.typeACount}
                onChange={(e) =>
                  updateFleet({ typeACount: parseInt(e.target.value) || 0 })
                }
              />
              <p className="text-xs text-muted-foreground">
                &lt;10,000 lbs GVWR
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="typeC" className="flex items-center gap-2">
                Type C
                <span className="text-xs text-muted-foreground">(Conventional)</span>
              </Label>
              <Input
                id="typeC"
                type="number"
                min="0"
                value={fleet.typeCCount}
                onChange={(e) =>
                  updateFleet({ typeCCount: parseInt(e.target.value) || 0 })
                }
              />
              <p className="text-xs text-muted-foreground">
                Body on chassis
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="typeD" className="flex items-center gap-2">
                Type D
                <span className="text-xs text-muted-foreground">(Transit)</span>
              </Label>
              <Input
                id="typeD"
                type="number"
                min="0"
                value={fleet.typeDCount}
                onChange={(e) =>
                  updateFleet({ typeDCount: parseInt(e.target.value) || 0 })
                }
              />
              <p className="text-xs text-muted-foreground">
                Flat front, transit-style
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Operational Profile</CardTitle>
          <CardDescription>
            Define your fleet&apos;s typical operating pattern
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="avgDailyMiles">Average Daily Miles per Bus</Label>
              <Input
                id="avgDailyMiles"
                type="number"
                min="1"
                max="200"
                value={fleet.avgDailyMiles}
                onChange={(e) =>
                  updateFleet({ avgDailyMiles: parseFloat(e.target.value) || 60 })
                }
              />
              <p className="text-xs text-muted-foreground">
                Typical range: 40-80 miles
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatingDays">Operating Days per Year</Label>
              <Input
                id="operatingDays"
                type="number"
                min="1"
                max="365"
                value={fleet.operatingDaysPerYear}
                onChange={(e) =>
                  updateFleet({
                    operatingDaysPerYear: parseInt(e.target.value) || 180,
                  })
                }
              />
              <p className="text-xs text-muted-foreground">
                School year: ~180 days
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Park-Out Percentage</Label>
              <span className="text-sm font-medium">
                {fleet.parkOutPercentage}%
              </span>
            </div>
            <Slider
              value={[fleet.parkOutPercentage]}
              onValueChange={([value]) =>
                updateFleet({ parkOutPercentage: value })
              }
              min={0}
              max={100}
              step={5}
            />
            <p className="text-xs text-muted-foreground">
              Percentage of buses that drivers take home overnight (park-out model).
              Higher percentages benefit from AXIVAI&apos;s Valet charging lane.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Current Costs (Optional Overrides) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Costs (Optional)</CardTitle>
          <CardDescription>
            Override default values with your actual costs. Leave blank to use
            location-based defaults.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dieselPrice">Diesel Price ($/gal)</Label>
              <Input
                id="dieselPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="Auto"
                value={fleet.dieselPricePerGallon || ""}
                onChange={(e) =>
                  updateFleet({
                    dieselPricePerGallon: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avgMpg">Average MPG</Label>
              <Input
                id="avgMpg"
                type="number"
                step="0.1"
                min="1"
                placeholder="Auto"
                value={fleet.avgMpg || ""}
                onChange={(e) =>
                  updateFleet({
                    avgMpg: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance">Annual Maintenance ($/bus)</Label>
              <Input
                id="maintenance"
                type="number"
                min="0"
                placeholder="Auto"
                value={fleet.annualMaintenanceCostPerBus || ""}
                onChange={(e) =>
                  updateFleet({
                    annualMaintenanceCostPerBus: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
