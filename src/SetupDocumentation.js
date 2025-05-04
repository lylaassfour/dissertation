import React from 'react';
import { Link } from 'react-router-dom';

const SetupDocumentation = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-10">
      <div className="bg-gray-900 rounded-3xl p-10 shadow-xl max-w-5xl w-full mx-4 border border-blue-600">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center mb-8">
          <span className="text-blue-500">AccessPilot</span> Setup Documentation
        </h1>
        <p className="text-gray-400 text-lg text-center mb-12">
          A step-by-step guide to set up and extend AccessPilot IAM on a pre-configured VM with Keycloak and Windows Server Active Directory (AD) integrated.
        </p>
        <p className="text-gray-500 text-sm text-center mb-12">
          Note: Replace placeholders like <code className="bg-gray-800 px-1 py-0.5 rounded">[VM_IP]</code> with your actual VM IP address.
        </p>

        {/* Installation Guide */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-blue-500 pb-2">1. Installation Guide: Starting the VM and Ensuring Keycloak and AD Work</h2>
          <div className="text-gray-300 space-y-4">
            <p>
              AccessPilot is a pre-configured virtual machine (VM) with both Keycloak and Windows Server Active Directory (AD) installed and integrated. Follow these steps to start the VM and confirm everything is working:
            </p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Start the VM</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Open your virtualization software (e.g., VMware Workstation, VirtualBox, or Hyper-V).</li>
                  <li>Locate the AccessPilot VM and click <strong>Start</strong> or <strong>Power On</strong>.</li>
                  <li>Wait for the VM to boot up completely. This may take a few minutes.</li>
                </ul>
              </li>
              <li>
                <strong>Log in to the VM</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Use the provided credentials to log in to the Windows Server environment on the VM. If credentials were not provided, try the default Windows Server Administrator account (e.g., username: <code className="bg-gray-800 px-1 py-0.5 rounded">Administrator</code>, password: ask your VM provider).</li>
                </ul>
              </li>
              <li>
                <strong>Verify Keycloak Service</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Keycloak is pre-installed and should be running as a service. Open a browser on the VM (or from your host machine if networked) and navigate to:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>http://[VM_IP]:8181</code>
                    </pre>
                  </li>
                  <li>If Keycloak isn’t running, start it manually:
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Open a Command Prompt or PowerShell on the VM as Administrator.</li>
                      <li>Navigate to the Keycloak directory (likely <code className="bg-gray-800 px-1 py-0.5 rounded">C:\keycloak\bin</code>):
                        <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                          <code>cd C:\keycloak\bin</code>
                        </pre>
                      </li>
                      <li>Start Keycloak:
                        <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                          <code>kc.bat start-dev --http-port=8181</code>
                        </pre>
                      </li>
                    </ul>
                  </li>
                  <li>You should see the Keycloak welcome page, confirming the service is running.</li>
                </ul>
              </li>
              <li>
                <strong>Verify Windows Server AD</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Open <code className="bg-gray-800 px-1 py-0.5 rounded">Server Manager</code> on the VM (search for it in the Start menu).</li>
                  <li>Go to <strong>Tools > Active Directory Users and Computers</strong>.</li>
                  <li>Ensure the domain <code className="bg-gray-800 px-1 py-0.5 rounded">accesspilot.local</code> is listed, and you can see pre-configured users (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">testuser</code>).</li>
                  <li>Test AD connectivity by running:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>nltest /sc_verify:accesspilot.local</code>
                    </pre>
                    If successful, you’ll see a confirmation that the domain controller is accessible.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Confirm Integration</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Since Keycloak and AD are pre-integrated, AD users should already be synced with Keycloak. You’ll confirm this in the next section when creating an account.</li>
                  <li>Ensure network ports are open: Keycloak uses port 8181 (or 8443 for HTTPS), and AD uses port 389 for LDAP. Check with:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>netstat -an | findstr 8181</code>
                      <code>netstat -an | findstr 389</code>
                    </pre>
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </section>

        {/* Setup Guide */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-blue-500 pb-2">2. Setup Guide: Creating an Account and Starting to Work</h2>
          <div className="text-gray-300 space-y-4">
            <p>
              This section guides you through creating an admin account in Keycloak and starting to use the AccessPilot system with AD users.
            </p>

            <h3 className="text-xl font-semibold text-blue-400">Step 1: Access Keycloak Admin Console</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Open a browser and navigate to:
                <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                  <code>http://[VM_IP]:8181/admin</code>
                </pre>
              </li>
              <li>
                If this is the first time accessing Keycloak, you’ll be prompted to create an admin account:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Enter a username (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">admin</code>).</li>
                  <li>Enter a strong password (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">Admin123!</code>).</li>
                  <li>Click <strong>Create</strong> to save the account.</li>
                </ul>
                <p className="text-red-400 mt-2">
                  Warning: Change the default admin credentials in production for security.
                </p>
              </li>
              <li>
                Log in using the admin credentials you created.
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-400 mt-6">Step 2: Verify AD Users in Keycloak</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                In the Keycloak Admin Console, select the <code className="bg-gray-800 px-1 py-0.5 rounded">accesspilot</code> realm from the top-left dropdown (this realm should already exist).
              </li>
              <li>
                Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Users</code> in the left sidebar.
              </li>
              <li>
                You should see pre-synced AD users (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">testuser</code>). If not, the integration may need troubleshooting:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">User Federation</code> and check the LDAP provider settings.</li>
                  <li>Click <strong>Synchronize all users</strong> to manually sync AD users.</li>
                </ul>
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-400 mt-6">Step 3: Log in as an AD User</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Open a new browser tab and navigate to:
                <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                  <code>http://[VM_IP]:8181</code>
                </pre>
              </li>
              <li>
                Click <strong>Sign In</strong> (or follow the login link for your application if already configured).
              </li>
              <li>
                Log in using an AD user’s credentials (e.g., username: <code className="bg-gray-800 px-1 py-0.5 rounded">testuser</code>, password: <code className="bg-gray-800 px-1 py-0.5 rounded">Test123!</code> or the password set in AD).
              </li>
              <li>
                If successful, you’re now logged in and can start using the AccessPilot system with AD user accounts.
              </li>
            </ol>
          </div>
        </section>

        {/* Features Documentation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-blue-500 pb-2">3. Features Documentation: Adding and Configuring Keycloak Features</h2>
          <div className="text-gray-300 space-y-4">
            <p>
              Keycloak provides powerful features to enhance the AccessPilot IAM system. Below are detailed instructions for adding and configuring each feature.
            </p>

            <h3 className="text-xl font-semibold text-blue-400">3.1 Single Sign-On (SSO)</h3>
            <p>
              SSO allows users to log in once and access multiple applications without re-authenticating. Since Keycloak and AD are integrated, SSO is already partially set up for AD users.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Create a Client for Your Application</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>In the <code className="bg-gray-800 px-1 py-0.5 rounded">accesspilot</code> realm, go to <code className="bg-gray-800 px-1 py-0.5 rounded">Clients</code> and click <strong>Create client</strong>.</li>
                  <li>Set <strong>Client type</strong> to <code className="bg-gray-800 px-1 py-0.5 rounded">OpenID Connect</code>.</li>
                  <li>Set <strong>Client ID</strong> to <code className="bg-gray-800 px-1 py-0.5 rounded">accesspilot-app</code>.</li>
                  <li>Click <strong>Next</strong>, enable <strong>Client authentication</strong>.</li>
                  <li>Set <strong>Valid redirect URIs</strong> to <code className="bg-gray-800 px-1 py-0.5 rounded">[YOUR_APP_URL]/*</code> (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">http://localhost:3000/*</code>).</li>
                  <li>Click <strong>Save</strong>.</li>
                </ul>
              </li>
              <li>
                <strong>Obtain Client Credentials</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to the <code className="bg-gray-800 px-1 py-0.5 rounded">Credentials</code> tab of the client and note the <strong>Client secret</strong>.</li>
                </ul>
              </li>
              <li>
                <strong>Integrate with Your Application</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Use the Keycloak client adapter (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">@react-keycloak/web</code> for React apps) to configure SSO.</li>
                  <li>Test by logging in with an AD user (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">testuser</code>).</li>
                </ul>
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-400 mt-6">3.2 Role-Based Access Control (RBAC)</h3>
            <p>
              RBAC allows you to assign roles to users to control access to resources.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Create Roles</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>In the <code className="bg-gray-800 px-1 py-0.5 rounded">accesspilot</code> realm, go to <code className="bg-gray-800 px-1 py-0.5 rounded">Roles</code> and click <strong>Create role</strong>.</li>
                  <li>Create roles like <code className="bg-gray-800 px-1 py-0.5 rounded">admin</code>, <code className="bg-gray-800 px-1 py-0.5 rounded">user</code>, and <code className="bg-gray-800 px-1 py-0.5 rounded">manager</code>.</li>
                </ul>
              </li>
              <li>
                <strong>Assign Roles to Users</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Users</code>, select a user (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">testuser</code>).</li>
                  <li>Under <code className="bg-gray-800 px-1 py-0.5 rounded">Role mappings</code>, assign the <code className="bg-gray-800 px-1 py-0.5 rounded">admin</code> role.</li>
                </ul>
              </li>
              <li>
                <strong>Map AD Groups to Keycloak Roles</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>In <code className="bg-gray-800 px-1 py-0.5 rounded">User Federation > LDAP provider</code>, enable <strong>Group Mappings</strong>.</li>
                  <li>Set <strong>Groups DN</strong> to <code className="bg-gray-800 px-1 py-0.5 rounded">CN=Users,DC=accesspilot,DC=local</code>.</li>
                  <li>In AD, create a group (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">Admins</code>):
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Open <code className="bg-gray-800 px-1 py-0.5 rounded">Active Directory Users and Computers</code>.</li>
                      <li>Right-click <code className="bg-gray-800 px-1 py-0.5 rounded">accesspilot.local</code>, select <strong>New > Group</strong>.</li>
                      <li>Name it <code className="bg-gray-800 px-1 py-0.5 rounded">Admins</code> and add <code className="bg-gray-800 px-1 py-0.5 rounded">testuser</code> to the group.</li>
                    </ul>
                  </li>
                  <li>In Keycloak, go to <code className="bg-gray-800 px-1 py-0.5 rounded">User Federation</code> and click <strong>Synchronize all users</strong> to update group mappings.</li>
                </ul>
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-400 mt-6">3.3 Multi-Factor Authentication (MFA)</h3>
            <p>
              MFA adds an extra layer of security by requiring a second authentication factor, such as an OTP (One-Time Password).
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Create an MFA Authentication Flow</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Authentication > Flows</code>.</li>
                  <li>Click <strong>Copy</strong> on the <code className="bg-gray-800 px-1 py-0.5 rounded">browser</code> flow, name the new flow <code className="bg-gray-800 px-1 py-0.5 rounded">browser-mfa</code>.</li>
                  <li>Add a step: Select <code className="bg-gray-800 px-1 py-0.5 rounded">OTP Form</code> and set it to <strong>Required</strong>.</li>
                </ul>
              </li>
              <li>
                <strong>Bind the MFA Flow</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Authentication > Bindings</code>.</li>
                  <li>Set <strong>Browser flow</strong> to <code className="bg-gray-800 px-1 py-0.5 rounded">browser-mfa</code>.</li>
                </ul>
              </li>
              <li>
                <strong>Configure OTP for Users</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Users</code>, select a user (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">testuser</code>).</li>
                  <li>Under <code className="bg-gray-800 px-1 py-0.5 rounded">Credentials</code>, click <strong>Configure OTP</strong>.</li>
                  <li>Follow the instructions to set up an OTP device (e.g., using Google Authenticator on your phone).</li>
                </ul>
              </li>
              <li>
                <strong>Test MFA</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Log out and log back in as <code className="bg-gray-800 px-1 py-0.5 rounded">testuser</code>. After entering the password, you’ll be prompted for an OTP.</li>
                </ul>
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-400 mt-6">3.4 User Behavior Analytics (UBA) Integration</h3>
            <p>
              UBA monitors user behavior to detect anomalies and adjust permissions dynamically. Keycloak doesn’t natively support UBA, so we’ll create a custom extension.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Develop a Custom Event Listener</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Create a Java project using Maven to develop a Keycloak extension.</li>
                  <li>Implement an event listener to log user actions (e.g., logins, resource access):
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>
{`package org.accesspilot.keycloak;

import org.keycloak.events.Event;
import org.keycloak.events.EventListenerProvider;
import org.keycloak.events.admin.AdminEvent;

public class UBAEventListener implements EventListenerProvider {
    @Override
    public void onEvent(Event event) {
        // Log event to an external UBA system via REST API
        System.out.println("User Event: " + event.getType() + " for user: " + event.getUserId());
        // Example: Send to an AI backend for analysis
    }

    @Override
    public void onEvent(AdminEvent adminEvent, boolean includeRepresentation) {
        // Log admin events if needed
    }

    @Override
    public void close() {
        // Cleanup if needed
    }
}`}
                      </code>
                    </pre>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Package and Deploy the Extension</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Package the project as a JAR file using Maven: <code className="bg-gray-800 px-1 py-0.5 rounded">mvn clean package</code>.</li>
                  <li>Copy the JAR to Keycloak: <code className="bg-gray-800 px-1 py-0.5 rounded">copy target\uba-listener.jar C:\keycloak\providers\</code>.</li>
                  <li>Restart Keycloak:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>cd C:\keycloak\bin</code>
                      <code>kc.bat start-dev --http-port=8181</code>
                    </pre>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Integrate with an AI Backend</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Modify the event listener to send events to an AI backend (e.g., AWS AI or Google AutoML) via REST API.</li>
                  <li>Use the AI backend to analyze behavior and return risk scores.</li>
                  <li>Use Keycloak’s Admin API to adjust permissions (e.g., revoke roles if a user’s risk score is high).</li>
                </ul>
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-400 mt-6">3.5 Auditing and Reporting</h3>
            <p>
              Auditing tracks user activities for compliance and troubleshooting.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enable Event Logging</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>In the <code className="bg-gray-800 px-1 py-0.5 rounded">accesspilot</code> realm, go to <code className="bg-gray-800 px-1 py-0.5 rounded">Realm Settings > Events</code>.</li>
                  <li>Enable <strong>Save events</strong>.</li>
                  <li>Select event types to log (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">Login</code>, <code className="bg-gray-800 px-1 py-0.5 rounded">Logout</code>).</li>
                  <li>Click <strong>Save</strong>.</li>
                </ul>
              </li>
              <li>
                <strong>View Logs</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Events > User events</code> to see logged activities.</li>
                </ul>
              </li>
              <li>
                <strong>Export Logs for Reporting</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Use a custom event listener (like the UBA listener above) to export logs to an external system (e.g., ELK Stack).</li>
                  <li>Analyze logs in the external system for detailed reports.</li>
                </ul>
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-400 mt-6">3.6 Context-Aware Access Control</h3>
            <p>
              Context-aware access control adjusts access based on factors like time, location, or device.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enable Authorization</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Clients > accesspilot-app</code>.</li>
                  <li>Enable <strong>Authorization</strong> in the client settings.</li>
                </ul>
              </li>
              <li>
                <strong>Create a Time-Based Policy</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Authorization > Policies</code>.</li>
                  <li>Click <strong>Create policy</strong> and select <code className="bg-gray-800 px-1 py-0.5 rounded">Time</code>.</li>
                  <li>Name it <code className="bg-gray-800 px-1 py-0.5 rounded">working-hours</code>.</li>
                  <li>Set the condition to allow access only during working hours (e.g., 9 AM - 5 PM, Monday to Friday).</li>
                  <li>Click <strong>Save</strong>.</li>
                </ul>
              </li>
              <li>
                <strong>Create a Device-Based Policy</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Create another policy, select <code className="bg-gray-800 px-1 py-0.5 rounded">JavaScript</code>.</li>
                  <li>Name it <code className="bg-gray-800 px-1 py-0.5 rounded">device-check</code>.</li>
                  <li>Add a script to check the <code className="bg-gray-800 px-1 py-0.5 rounded">User-Agent</code> header:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>
{`if ($httpHeaders['User-Agent'].includes('Mobile')) {
    true;
} else {
    false;
}`}
                      </code>
                    </pre>
                  </li>
                  <li>Click <strong>Save</strong>.</li>
                </ul>
              </li>
              <li>
                <strong>Apply Policies to Resources</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Authorization > Resources</code>.</li>
                  <li>Create a resource (e.g., <code className="bg-gray-800 px-1 py-0.5 rounded">/dashboard</code>).</li>
                  <li>Go to <code className="bg-gray-800 px-1 py-0.5 rounded">Authorization > Permissions</code>, create a permission, and apply the <code className="bg-gray-800 px-1 py-0.5 rounded">working-hours</code> and <code className="bg-gray-800 px-1 py-0.5 rounded">device-check</code> policies.</li>
                </ul>
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-400 mt-6">3.7 End-to-End Encryption</h3>
            <p>
              End-to-end encryption secures data in transit and at rest.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Obtain an SSL Certificate</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Use a pre-installed certificate if available, or generate a self-signed certificate for testing:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>cd C:\</code>
                      <code>openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes</code>
                    </pre>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Configure Keycloak for HTTPS</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Convert the certificate to a Java KeyStore:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>openssl pkcs12 -export -in cert.pem -inkey key.pem -out keystore.p12 -name keycloak</code>
                      <code>keytool -importkeystore -srckeystore keystore.p12 -srcstoretype PKCS12 -destkeystore keystore.jks -deststoretype JKS</code>
                    </pre>
                  </li>
                  <li>Edit <code className="bg-gray-800 px-1 py-0.5 rounded">C:\keycloak\conf\keycloak.conf</code>:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>
{`https-port=8443
https-key-store-file=C:\\path\\to\\keystore.jks
https-key-store-password=yourpassword`}
                      </code>
                    </pre>
                  </li>
                  <li>Restart Keycloak:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>cd C:\keycloak\bin</code>
                      <code>kc.bat start --https-port=8443</code>
                    </pre>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Test HTTPS</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Access Keycloak at <code className="bg-gray-800 px-1 py-0.5 rounded">https://[VM_IP]:8443</code>.</li>
                </ul>
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-400 mt-6">3.8 Scalability with Cloud-Native Deployment</h3>
            <p>
              Deploy Keycloak in a cloud-native environment for scalability.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Containerize Keycloak with Docker</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Ensure Docker is installed on the VM. If not, install it:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>powershell -Command "Invoke-WebRequest -Uri https://get.docker.com -OutFile install-docker.ps1"</code>
                      <code>powershell -Command ".\install-docker.ps1"</code>
                    </pre>
                  </li>
                  <li>Create a <code className="bg-gray-800 px-1 py-0.5 rounded">Dockerfile</code> in <code className="bg-gray-800 px-1 py-0.5 rounded">C:\keycloak</code>:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>
{`FROM quay.io/keycloak/keycloak:latest
COPY conf/keycloak.conf /opt/keycloak/conf/
CMD ["start", "--http-port=8181"]`}
                      </code>
                    </pre>
                  </li>
                  <li>Build and run the Docker image:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>cd C:\keycloak</code>
                      <code>docker build -t accesspilot-keycloak .</code>
                      <code>docker run -p 8181:8181 accesspilot-keycloak</code>
                    </pre>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Deploy on Kubernetes</strong>:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Install a Kubernetes environment if scaling to the cloud (e.g., Minikube for testing on the VM).</li>
                  <li>Use a Helm chart for Keycloak:
                    <pre className="bg-gray-800 p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>helm repo add bitnami https://charts.bitnami.com/bitnami</code>
                      <code>helm install keycloak bitnami/keycloak</code>
                    </pre>
                  </li>
                  <li>For production, deploy on a managed Kubernetes service like AWS EKS, GCP GKE, or Azure AKS.</li>
                </ul>
              </li>
            </ol>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-blue-500 pb-2">Conclusion</h2>
          <p className="text-gray-300">
            This guide provides a complete setup for AccessPilot IAM on a pre-configured VM with Keycloak and Windows Server AD integrated. It includes steps to start the VM, create an account, and add advanced features like SSO, MFA, UBA, and more, tailored for SMBs and non-profits.
          </p>
        </section>

        {/* Back to Options */}
        <nav className="text-center">
          <Link
            to="/post-login"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            aria-label="Navigate back to post-login options"
          >
            Back to Options
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SetupDocumentation;