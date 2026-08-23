import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

interface SendUnlockEmailProps {
  to: string;
  name: string;
  status: 'approved' | 'rejected';
  note?: string;
}

export async function sendUnlockStatusEmail({ to, name, status, note }: SendUnlockEmailProps) {
  const isApproved = status === 'approved';
  const subject = isApproved 
    ? 'Congratulations! Your Talenzo Free Unlock is Approved 🎉' 
    : 'Update on your Talenzo Free Unlock Request';

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: ${isApproved ? '#22c55e' : '#eab308'};">
        ${isApproved ? 'Free Unlock Approved!' : 'Submission Update'}
      </h2>
      <p>Hi ${name},</p>
      
      ${isApproved ? `
        <p>Great news! Your screenshots have been reviewed and approved. You now have full free access to Talenzo.</p>
        <p>Log in now to start exploring all features.</p>
      ` : `
        <p>We have reviewed your recent submission for the Free Unlock Program.</p>
        <p>Unfortunately, we could not approve it at this time.</p>
        ${note ? `<div style="background: #f3f4f6; padding: 12px; border-left: 4px solid #eab308; margin: 16px 0;"><strong>Reviewer Note:</strong><br/>${note}</div>` : ''}
        <p>Please feel free to submit again with the correct screenshots.</p>
      `}
      
      <p>Best regards,<br/>The Talenzo Team</p>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Talenzo <no-reply@talenzo.app>', // Update this with a verified domain
      to,
      subject,
      html,
    });
    
    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
