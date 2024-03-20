export const passwordResetEmail = (resetUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body font-family: 'IBM Plex Sans', Arial, sans-serif; margin: 0; padding: 20px;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: auto; max-width: 600px; width: 100%; background-color: #FAFAFA; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 20px; text-align: center;">
        <h2 style="color: #14213D; font-family: 'IBM Plex Sans', Arial, sans-serif;">Password Reset Request</h2>
        <p style="color: #14213D; font-family: 'Arial', sans-serif;">You recently requested to reset your password for your Play Trade account.</p>
        <p style="color: #14213D; font-family: 'Arial', sans-serif;"> Click the button below to reset it:</p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 20px auto;">
          <tr>
            <td bgcolor="#DD7F11" style="border-radius: 8px;">
              <a href="${resetUrl}" target="_blank" style="padding: 10px 20px; display: block; border-radius: 8px; font-weight: bold; font-family: 'Arial', sans-serif; color: #ffffff; text-decoration: none;">Reset Your Password</a>
            </td>
          </tr>
        </table>
        <p style="color: #14213D; font-family: 'Arial', sans-serif; text-align: right;">Thanks,<br>The Play Trade Team</p>
        <p style="color: #14213D; font-family: 'Arial', sans-serif;">If you did not request a password reset, please ignore this email.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

