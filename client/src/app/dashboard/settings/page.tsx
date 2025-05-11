import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User, Shield, Palette, LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and set preferences.
          </p>
        </div>
        <Separator />
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline-block">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline-block">Account</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline-block">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline-block">Appearance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src="/placeholder.svg?height=96&width=96"
                      alt="Avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button size="sm">Upload new photo</Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      defaultValue="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about yourself"
                    defaultValue="I'm a software developer based in New York."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Update your account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    defaultValue="johndoe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-12">UTC-12:00</SelectItem>
                      <SelectItem value="utc-11">UTC-11:00</SelectItem>
                      <SelectItem value="utc-10">UTC-10:00</SelectItem>
                      <SelectItem value="utc-9">UTC-09:00</SelectItem>
                      <SelectItem value="utc-8">UTC-08:00</SelectItem>
                      <SelectItem value="utc-7">UTC-07:00</SelectItem>
                      <SelectItem value="utc-6">UTC-06:00</SelectItem>
                      <SelectItem value="utc-5">UTC-05:00</SelectItem>
                      <SelectItem value="utc-4">UTC-04:00</SelectItem>
                      <SelectItem value="utc-3">UTC-03:00</SelectItem>
                      <SelectItem value="utc-2">UTC-02:00</SelectItem>
                      <SelectItem value="utc-1">UTC-01:00</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="utc+1">UTC+01:00</SelectItem>
                      <SelectItem value="utc+2">UTC+02:00</SelectItem>
                      <SelectItem value="utc+3">UTC+03:00</SelectItem>
                      <SelectItem value="utc+4">UTC+04:00</SelectItem>
                      <SelectItem value="utc+5">UTC+05:00</SelectItem>
                      <SelectItem value="utc+6">UTC+06:00</SelectItem>
                      <SelectItem value="utc+7">UTC+07:00</SelectItem>
                      <SelectItem value="utc+8">UTC+08:00</SelectItem>
                      <SelectItem value="utc+9">UTC+09:00</SelectItem>
                      <SelectItem value="utc+10">UTC+10:00</SelectItem>
                      <SelectItem value="utc+11">UTC+11:00</SelectItem>
                      <SelectItem value="utc+12">UTC+12:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button variant="outline">Change password</Button>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Danger zone</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Delete account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all of your content.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <LogOut className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email notifications</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Marketing emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new products, features, and more.
                      </p>
                    </div>
                    <Switch id="marketing" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="social">Social notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails for friend requests, follows, and more.
                      </p>
                    </div>
                    <Switch id="social" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="security">Security emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about your account activity and security.
                      </p>
                    </div>
                    <Switch id="security" defaultChecked />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Push notifications</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="comments">Comments</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when someone comments on your
                        posts.
                      </p>
                    </div>
                    <Switch id="comments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mentions">Mentions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when someone mentions you.
                      </p>
                    </div>
                    <Switch id="mentions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="directMessages">Direct messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for direct messages.
                      </p>
                    </div>
                    <Switch id="directMessages" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the appearance of the app.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-24 w-full rounded-md bg-white border-2 border-muted cursor-pointer hover:border-primary" />
                      <span className="text-sm font-medium">Light</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-24 w-full rounded-md bg-slate-950 border-2 border-primary cursor-pointer" />
                      <span className="text-sm font-medium">Dark</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-24 w-full rounded-md bg-gradient-to-b from-white to-slate-950 border-2 border-muted cursor-pointer hover:border-primary" />
                      <span className="text-sm font-medium">System</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Font size</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-5 items-center gap-4">
                      <span className="text-sm">Aa</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        defaultValue="3"
                        step="1"
                        className="col-span-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary/10"
                      />
                      <span className="text-lg">Aa</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Density</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-5 items-center gap-4">
                      <span className="text-sm">Compact</span>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        defaultValue="2"
                        step="1"
                        className="col-span-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary/10"
                      />
                      <span className="text-sm">Comfortable</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
