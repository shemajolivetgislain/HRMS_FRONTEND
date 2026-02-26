'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showApiKey, setShowApiKey] = useState(false)

  const [profileData, setProfileData] = useState({
    companyName: 'Tech Innovators Ltd',
    email: 'admin@techinnovators.com',
    phone: '+1 (555) 123-4567',
    industry: 'Technology',
    website: 'www.techinnovators.com',
    address: '123 Tech Street, Silicon Valley, CA 94025',
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    employeeUpdates: true,
    systemAlerts: true,
    weeklyReport: true,
    payrollReminders: true,
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your company and system settings
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto">
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Company Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Company Information
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={profileData.companyName}
                    onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue={profileData.industry}>
                    <SelectTrigger id="industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Save Changes
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </Card>

          {/* Branding Card */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Company Branding
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your logo here or click to upload
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <div className="w-12 h-10 rounded-lg bg-primary border-2 border-border cursor-pointer" />
                  <Input id="primaryColor" placeholder="#2563eb" className="flex-1" defaultValue="#3b82f6" />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Branding
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              {[
                {
                  key: 'emailNotifications' as const,
                  title: 'Email Notifications',
                  description: 'Receive important updates via email',
                },
                {
                  key: 'employeeUpdates' as const,
                  title: 'Employee Updates',
                  description: 'Get notified about employee activities',
                },
                {
                  key: 'systemAlerts' as const,
                  title: 'System Alerts',
                  description: 'Critical system and security alerts',
                },
                {
                  key: 'weeklyReport' as const,
                  title: 'Weekly Report',
                  description: 'Receive weekly summary reports',
                },
                {
                  key: 'payrollReminders' as const,
                  title: 'Payroll Reminders',
                  description: 'Reminders for upcoming payroll dates',
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [item.key]: checked })
                    }
                  />
                </div>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                Save Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          {/* Two-Factor Authentication */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Two-Factor Authentication
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Enable 2FA</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enhance your account security with two-factor authentication
                  </p>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setSecurity({ ...security, twoFactorAuth: checked })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Session Management */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Session Management
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timeout">Session Timeout (minutes)</Label>
                <Input
                  id="timeout"
                  type="number"
                  value={security.sessionTimeout}
                  onChange={(e) =>
                    setSecurity({ ...security, sessionTimeout: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Automatically logout inactive users after this duration
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Password Expiry (days)</Label>
                <Input
                  id="expiry"
                  type="number"
                  value={security.passwordExpiry}
                  onChange={(e) =>
                    setSecurity({ ...security, passwordExpiry: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Require users to change password after this period
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Security Settings
              </Button>
            </div>
          </Card>

          {/* API Keys */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              API Keys
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/50">
                    <code className="text-xs font-mono text-muted-foreground flex-1">
                      {showApiKey ? 'sk_live_51234567890abcdefghijk' : '••••••••••••••••••••••••••'}
                    </code>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showApiKey ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <Button variant="outline" onClick={() => navigator.clipboard.writeText('sk_live_51234567890abcdefghijk')}>
                    Copy
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="text-destructive hover:text-destructive">
                Regenerate API Key
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Connected Integrations
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Google Workspace', status: 'connected', icon: '🔵' },
                { name: 'Slack', status: 'connected', icon: '🔵' },
                { name: 'Microsoft Teams', status: 'not connected', icon: '⚪' },
                { name: 'Zoom', status: 'connected', icon: '🔵' },
              ].map((integration, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{integration.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      {integration.status}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
