from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# SMTP Configuration
SMTP_HOST = os.getenv('SMTP_HOST', 'smtp.zoho.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')
EMAIL_FROM = os.getenv('EMAIL_FROM', SMTP_USER)
EMAIL_TO = os.getenv('EMAIL_TO', SMTP_USER)


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'Server is running'}), 200


@app.route('/api/contact', methods=['POST'])
def send_contact_email():
    try:
        data = request.get_json(silent=True) or {}

        # Validate required fields (matches the website contact form)
        business_name = data.get('businessName', '').strip()
        name = data.get('yourName', '').strip()
        email = data.get('yourEmail', '').strip()
        phone = data.get('phone', '').strip()
        message = data.get('businessDo', '').strip()

        if not name or not email or not message:
            return jsonify({
                'success': False,
                'error': 'Name, email, and message are required'
            }), 400

        # Create email message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'New Contact Request from {name}' + (f' ({business_name})' if business_name else '')
        msg['From'] = EMAIL_FROM
        msg['To'] = EMAIL_TO
        msg['Reply-To'] = email

        # Plain text version
        text_content = f"""
New Contact Form Submission

Business Name: {business_name if business_name else 'Not provided'}
Name: {name}
Email: {email}
Phone: {phone if phone else 'Not provided'}

What their business does:
{message}

---
This email was sent from the Isha Systems website contact form.
        """

        # HTML version
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f1f4d;">
                <h2 style="color: #f97316;">New Contact Request</h2>
                <p><strong>Business Name:</strong> {business_name if business_name else 'Not provided'}</p>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone if phone else 'Not provided'}</p>
                <p><strong>What their business does:</strong></p>
                <p style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #f97316;">
                    {message.replace(chr(10), '<br>')}
                </p>
                <hr style="border: none; border-top: 1px solid #e2edf7; margin: 20px 0;">
                <p style="color: #64748b; font-size: 12px;">
                    <em>This email was sent from the Isha Systems website contact form.</em>
                </p>
            </body>
        </html>
        """

        # Attach both versions
        part1 = MIMEText(text_content, 'plain')
        part2 = MIMEText(html_content, 'html')
        msg.attach(part1)
        msg.attach(part2)

        # Send email via SMTP
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)

        print(f'Email sent successfully from {email}')

        return jsonify({
            'success': True,
            'message': 'Email sent successfully'
        }), 200

    except Exception as e:
        print(f'Error sending email: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'Failed to send email. Please try again later.'
        }), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
