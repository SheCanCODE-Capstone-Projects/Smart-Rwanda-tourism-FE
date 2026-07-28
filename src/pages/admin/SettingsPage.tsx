import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import PageHeader from '../../components/admin/PageHeader'
import Card from '../../components/admin/Card'
import { FormInput } from '../../components/admin/FormInput'

export default function SettingsPage() {
  // Platform Settings
  const [platformName, setPlatformName] = useState('RwandaWays Marketplace')
  const [supportEmail, setSupportEmail] = useState('support@rwandaways.rw')
  const [contactPhone, setContactPhone] = useState('+250 788 000 000')

  // Admin Profile
  const [adminFirstName, setAdminFirstName] = useState('Admin')
  const [adminLastName, setAdminLastName] = useState('RwandaWays')
  const [adminEmail, setAdminEmail] = useState('admin@rwandaways.rw')

  // Password Change
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [providerApprovalNotif, setProviderApprovalNotif] = useState(true)
  const [newBookingNotif, setNewBookingNotif] = useState(true)
  const [reviewNotif, setReviewNotif] = useState(false)

  function handleSavePlatformSettings() {
    // In production: call adminService.updatePlatformSettings({ platformName, supportEmail, contactPhone })
    console.log('Save platform settings:', { platformName, supportEmail, contactPhone })
    alert('Platform settings saved successfully!')
  }

  function handleSaveProfile() {
    // In production: call adminService.updateProfile({ firstName: adminFirstName, lastName: adminLastName, email: adminEmail })
    console.log('Save admin profile:', { adminFirstName, adminLastName, adminEmail })
    alert('Profile updated successfully!')
  }

  function handleChangePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill all password fields')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }
    // In production: call adminService.changePassword({ currentPassword, newPassword })
    console.log('Change password')
    alert('Password changed successfully!')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  function handleSaveNotifications() {
    // In production: call adminService.updateNotificationSettings({ emailNotifications, providerApprovalNotif, newBookingNotif, reviewNotif })
    console.log('Save notification settings:', { emailNotifications, providerApprovalNotif, newBookingNotif, reviewNotif })
    alert('Notification settings saved successfully!')
  }

  return (
    <AdminLayout title="Settings">
      <PageHeader
        title="Settings"
        description="Manage platform configuration and admin preferences"
        breadcrumbs={[{ label: 'Admin', to: '/admin/dashboard' }, { label: 'Settings' }]}
      />

      <div className="space-y-6">
        {/* Platform Settings */}
        <Card>
          <h2 className="text-lg font-bold text-[#1F2D2F] mb-4">Platform Settings</h2>
          <div className="space-y-4">
            <FormInput
              label="Platform Name"
              value={platformName}
              onChange={setPlatformName}
              placeholder="RwandaWays Marketplace"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Support Email"
                type="email"
                value={supportEmail}
                onChange={setSupportEmail}
                placeholder="support@rwandaways.rw"
              />
              <FormInput
                label="Contact Phone"
                type="tel"
                value={contactPhone}
                onChange={setContactPhone}
                placeholder="+250 788 000 000"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSavePlatformSettings}
                className="px-5 py-2 rounded-xl bg-[#14637A] text-white hover:bg-[#0d4b5c] transition-colors"
              >
                Save Platform Settings
              </button>
            </div>
          </div>
        </Card>

        {/* Admin Profile */}
        <Card>
          <h2 className="text-lg font-bold text-[#1F2D2F] mb-4">Admin Profile</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                value={adminFirstName}
                onChange={setAdminFirstName}
                placeholder="Admin"
              />
              <FormInput
                label="Last Name"
                value={adminLastName}
                onChange={setAdminLastName}
                placeholder="RwandaWays"
              />
            </div>
            <FormInput
              label="Email Address"
              type="email"
              value={adminEmail}
              onChange={setAdminEmail}
              placeholder="admin@rwandaways.rw"
            />
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-xl bg-[#14637A] text-white hover:bg-[#0d4b5c] transition-colors"
              >
                Save Profile
              </button>
            </div>
          </div>
        </Card>

        {/* Password Change */}
        <Card>
          <h2 className="text-lg font-bold text-[#1F2D2F] mb-4">Change Password</h2>
          <div className="space-y-4">
            <FormInput
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="••••••••"
            />
            <FormInput
              label="New Password"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="••••••••"
            />
            <FormInput
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="••••••••"
            />
            <div className="flex justify-end pt-2">
              <button
                onClick={handleChangePassword}
                className="px-5 py-2 rounded-xl bg-[#14637A] text-white hover:bg-[#0d4b5c] transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <h2 className="text-lg font-bold text-[#1F2D2F] mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={e => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-[#C8D0DD] text-[#14637A] focus:ring-[#14637A]"
              />
              <div>
                <p className="font-medium text-[#1F2D2F]">Email Notifications</p>
                <p className="text-sm text-[#68767A]">Receive email notifications for platform activities</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={providerApprovalNotif}
                onChange={e => setProviderApprovalNotif(e.target.checked)}
                disabled={!emailNotifications}
                className="w-5 h-5 rounded border-[#C8D0DD] text-[#14637A] focus:ring-[#14637A] disabled:opacity-50"
              />
              <div>
                <p className="font-medium text-[#1F2D2F]">Provider Approval Requests</p>
                <p className="text-sm text-[#68767A]">Notify when new providers need verification</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={newBookingNotif}
                onChange={e => setNewBookingNotif(e.target.checked)}
                disabled={!emailNotifications}
                className="w-5 h-5 rounded border-[#C8D0DD] text-[#14637A] focus:ring-[#14637A] disabled:opacity-50"
              />
              <div>
                <p className="font-medium text-[#1F2D2F]">New Bookings</p>
                <p className="text-sm text-[#68767A]">Notify when users make new bookings</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={reviewNotif}
                onChange={e => setReviewNotif(e.target.checked)}
                disabled={!emailNotifications}
                className="w-5 h-5 rounded border-[#C8D0DD] text-[#14637A] focus:ring-[#14637A] disabled:opacity-50"
              />
              <div>
                <p className="font-medium text-[#1F2D2F]">New Reviews</p>
                <p className="text-sm text-[#68767A]">Notify when users submit new reviews</p>
              </div>
            </label>
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveNotifications}
                className="px-5 py-2 rounded-xl bg-[#14637A] text-white hover:bg-[#0d4b5c] transition-colors"
              >
                Save Notification Settings
              </button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card>
          <h2 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
              <h3 className="font-semibold text-red-900 mb-1">Clear All Cache</h3>
              <p className="text-sm text-red-700 mb-3">This will clear all cached data and may temporarily slow down the platform.</p>
              <button className="px-4 py-2 rounded-lg border border-red-600 text-red-600 text-sm font-medium hover:bg-red-600 hover:text-white transition-colors">
                Clear Cache
              </button>
            </div>
            <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
              <h3 className="font-semibold text-red-900 mb-1">Export Platform Data</h3>
              <p className="text-sm text-red-700 mb-3">Download a complete backup of all platform data.</p>
              <button className="px-4 py-2 rounded-lg border border-red-600 text-red-600 text-sm font-medium hover:bg-red-600 hover:text-white transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
