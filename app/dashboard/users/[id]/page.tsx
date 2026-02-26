'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  PencilEdit02Icon,
  Mail01Icon,
  CallIcon,
  Location01Icon,
  Briefcase01Icon,
  Calendar01Icon,
  Note01Icon,
  Download01Icon,
  MoreHorizontalIcon,
} from '@hugeicons/core-free-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface EmployeeProfile {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  manager: string
  status: 'active' | 'inactive' | 'pending'
  hireDate: string
  dob: string
  address: string
  city: string
  country: string
  zipCode: string
}

// Sample employee data
const employeeData: EmployeeProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  position: 'Senior Developer',
  department: 'Engineering',
  manager: 'Alice Johnson',
  status: 'active',
  hireDate: '2021-03-15',
  dob: '1990-05-22',
  address: '123 Main Street',
  city: 'San Francisco',
  country: 'United States',
  zipCode: '94102',
}

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(employeeData)

  const handleInputChange = (field: keyof EmployeeProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header with Avatar */}
      <Card className="p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={`https://avatar.vercel.sh/${formData.name}`} />
            <AvatarFallback>{formData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {formData.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {formData.position}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <StatusBadge status={formData.status} />
                  <span className="text-xs text-muted-foreground">
                    {formData.department}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <HugeiconsIcon icon={PencilEdit02Icon} className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    render={
                      <Button variant="outline" size="icon">
                        <HugeiconsIcon icon={MoreHorizontalIcon} className="w-4 h-4" />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4 mr-2" />
                      <span>Send Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={Download01Icon} className="w-4 h-4 mr-2" />
                      <span>Export Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <span>Deactivate</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Personal Information
            </h2>
            {isEditing ? (
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Address</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Zip Code</Label>
                    <Input
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData(employeeData)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Full Name" value={formData.name} icon={<HugeiconsIcon icon={Note01Icon} className="w-4 h-4" />} />
                <InfoField label="Email" value={formData.email} icon={<HugeiconsIcon icon={Mail01Icon} className="w-4 h-4" />} />
                <InfoField label="Phone" value={formData.phone} icon={<HugeiconsIcon icon={CallIcon} className="w-4 h-4" />} />
                <InfoField label="Date of Birth" value={new Date(formData.dob).toLocaleDateString()} icon={<HugeiconsIcon icon={Calendar01Icon} className="w-4 h-4" />} />
                <InfoField label="Address" value={formData.address} icon={<HugeiconsIcon icon={Location01Icon} className="w-4 h-4" />} />
                <InfoField label="City" value={formData.city} icon={<HugeiconsIcon icon={Location01Icon} className="w-4 h-4" />} />
                <InfoField label="Country" value={formData.country} icon={<HugeiconsIcon icon={Location01Icon} className="w-4 h-4" />} />
                <InfoField label="Zip Code" value={formData.zipCode} icon={<HugeiconsIcon icon={Location01Icon} className="w-4 h-4" />} />
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Employment Information Tab */}
        <TabsContent value="employment" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Employment Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="Position" value={formData.position} icon={<HugeiconsIcon icon={Briefcase01Icon} className="w-4 h-4" />} />
              <InfoField label="Department" value={formData.department} icon={<HugeiconsIcon icon={Briefcase01Icon} className="w-4 h-4" />} />
              <InfoField label="Manager" value={formData.manager} icon={<HugeiconsIcon icon={Note01Icon} className="w-4 h-4" />} />
              <InfoField label="Hire Date" value={new Date(formData.hireDate).toLocaleDateString()} icon={<HugeiconsIcon icon={Calendar01Icon} className="w-4 h-4" />} />
              <InfoField label="Status" value={<StatusBadge status={formData.status} />} icon={<HugeiconsIcon icon={Note01Icon} className="w-4 h-4" />} />
              <InfoField label="Tenure" value={`${Math.floor((new Date().getTime() - new Date(formData.hireDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years`} icon={<HugeiconsIcon icon={Calendar01Icon} className="w-4 h-4" />} />
            </div>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Documents
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Employment Contract', date: '2021-03-15', type: 'PDF' },
                { name: 'Employee Handbook', date: '2021-03-15', type: 'PDF' },
                { name: 'Offer Letter', date: '2021-02-28', type: 'PDF' },
                { name: 'ID Verification', date: '2021-03-15', type: 'PDF' },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(doc.date).toLocaleDateString()} • {doc.type}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <HugeiconsIcon icon={Download01Icon} className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {[
                { action: 'Profile updated', date: 'Today at 2:30 PM', user: 'Self' },
                { action: 'Salary reviewed', date: '5 days ago', user: 'HR Admin' },
                { action: 'Performance review completed', date: '2 weeks ago', user: 'Manager' },
                { action: 'Profile created', date: '3 years ago', user: 'System' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.date} by {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface InfoFieldProps {
  label: string
  value: string | React.ReactNode
  icon?: React.ReactNode
}

function InfoField({ label, value, icon }: InfoFieldProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
      {icon && <div className="flex-shrink-0 text-muted-foreground mt-0.5">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground mt-1">{value}</p>
      </div>
    </div>
  )
}

