import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let toEmail = "unknown";
  let templateName = "unknown";

  try {
    const body = await req.json();
    const { to, subject, template, data } = body;
    toEmail = to;
    templateName = template;

    if (!to || !subject || !template || !data) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, subject, template, or data" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not configured.");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Prepare Email Content based on Template
    let htmlContent = "";
    const { fullName, role: rawRole, isAgency } = data;

    // Map internal role names to display names
    const roleMapping: Record<string, string> = {
      "guard": "Security Professional",
      "hr": "HR Manager",
      "admin": "Administrator",
      "superadmin": "Super Admin",
      "agency": "Security Agency"
    };
    const role = roleMapping[rawRole] || rawRole;

    switch (template) {
      case "welcome":
        if (rawRole === "guard") {
          htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4f46e5;">Welcome to TheNST 👋</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for joining <strong>TheNST</strong> — a platform connecting skilled security professionals with trusted opportunities.</p>
            <p>Your account has been successfully created.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>🔒 <strong>Next Step: Complete Your KYC Verification</strong></p>
            <p>To activate your profile and start accessing opportunities, please complete your KYC verification.</p>
            <p>You can log in to your account and proceed with KYC using the link below:</p>
            <div style="margin: 30px 0;">
              <a href="https://thenst.co/login" style="display:inline-block; background:#5b5bd6; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:500;">Login & Complete KYC</a>
            </div>
            <p>We look forward to having you onboard.</p>
            <p>Regards,<br/><strong>TheNST Team</strong></p>
          </div>
        `;
        } else if (rawRole === "hr") {
          htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4f46e5;">Welcome to TheNST 👋</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for registering with <strong>TheNST</strong>. We are pleased to have your organization onboard.</p>
            <p>Your account has been successfully created.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>🏢 <strong>Next Step: Complete Your Company Verification</strong></p>
            <p>To start accessing verified security professionals and hiring services, please complete your company KYC by providing the required organization details.</p>
            <p>You can log in and proceed with verification using the link below:</p>
            <div style="margin: 30px 0;">
              <a href="https://thenst.co/login" style="display:inline-block; background:#5b5bd6; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:500;">Login & Complete Company KYC</a>
            </div>
            <p>We look forward to supporting your hiring needs through TheNST.</p>
            <p>Regards,<br/><strong>TheNST Team</strong></p>
          </div>
        `;
        } else if (rawRole === "agency") {
          htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4f46e5;">Welcome to TheNST 👋</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for registering your Security Agency with <strong>TheNST</strong>.</p>
            <p>Your account has been successfully created.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>🏢 <strong>Next Step: Complete Your Agency Verification</strong></p>
            <p>To start receiving bulk hiring requests, please complete your agency KYC by providing the required legal documents.</p>
            <p>You can log in and proceed with verification using the link below:</p>
            <div style="margin: 30px 0;">
              <a href="https://thenst.co/login" style="display:inline-block; background:#5b5bd6; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:500;">Login & Complete Agency KYC</a>
            </div>
            <p>We look forward to growing your business with TheNST.</p>
            <p>Regards,<br/><strong>TheNST Team</strong></p>
          </div>
        `;
        } else if (rawRole === "admin") {
          htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4f46e5;">Admin Account Created 👤</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>An admin account has been created for you on <strong>TheNST</strong>.</p>
            <p>You can log in using your registered credentials. Please note that your account is currently under verification.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>🔒 <strong>Next Step:</strong><br/>Your account will be activated once it is verified by the SuperAdmin.</p>
            <div style="margin: 30px 0;">
              <a href="https://thenst.co/login" style="display:inline-block; background:#5b5bd6; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:500;">Login to Your Account</a>
            </div>
            <p>You will receive a confirmation email once your account has been verified.</p>
            <p>Regards,<br/><strong>TheNST Team</strong></p>
          </div>
        `;
        } else {
          htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4f46e5;">Welcome to TheNST!</h2>
            <p>Hello <strong>${fullName}</strong>,</p>
            <p>Thank you for registering as a <strong>${role}</strong> on our platform. Your account has been created successfully.</p>
            ${rawRole === 'admin' ? '<p style="color: #f59e0b;">Note: Admin accounts require manual verification by a Superadmin before full access is granted.</p>' : ''}
            <p>We're excited to have you on board!</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #6b7280;">This is an automated message, please do not reply.</p>
          </div>
        `;
        }
        break;

      case "approval":
        if (rawRole === "admin") {
          htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #10b981;">Account Verified ✅</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>We are pleased to inform you that your admin account has been successfully verified by the <strong>Super Admin</strong> on <strong>TheNST</strong>.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>You now have full access to your administrative dashboard and can begin managing platform operations.</p>
            <div style="margin: 30px 0;">
              <a href="https://thenst.co/login" style="display:inline-block; background:#5b5bd6; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:500;">Login to Dashboard</a>
            </div>
            <p>If you require any assistance, please feel free to reach out.</p>
            <p>Regards,<br/><strong>TheNST Team</strong></p>
          </div>
        `;
        } else {
          const loginUrl = "https://thenst.co/login";
          const approvalTitle = rawRole === "hr" ? "TheNST – Approval Notification" : rawRole === "agency" ? "TheNST – Agency Approved" : "TheNST – Account Approved";
          const approvalMessage = data.message || (rawRole === "hr"
            ? `Great news! Your company verification has been successfully approved by the TheNST team. You can now start accessing verified security professionals.`
            : rawRole === "agency"
              ? `Great news! Your Security Agency has been successfully approved by the TheNST team. You can now start receiving bulk hiring requests.`
              : `Great news! Your account verification as a <strong>${role}</strong> has been approved by our team. You are now visible to top employers.`);

          htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #10b981;">${approvalTitle}</h2>
            <p>Hello <strong>${fullName}</strong>,</p>
            <p>${approvalMessage}</p>
            <p>You can now log in to your dashboard and access all features of the platform.</p>
            <div style="margin: 30px 0;">
              <a href="${loginUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login to Dashboard</a>
            </div>
            <p>Best regards,<br/>TheNST Team</p>
          </div>
        `;
        }
        break;

      case "rejection":
        const rejectionTitle = rawRole === "hr" ? "Company Verification Update" : rawRole === "agency" ? "Agency Verification Update" : "Verification Update";
        htmlContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #ef4444;">${rejectionTitle}</h2>
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>We have reviewed your application for the <strong>${role}</strong> role. Unfortunately, we cannot approve it at this time.</p>
              ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ''}
              <p>If you believe this is a mistake, please contact support or update your details in the dashboard.</p>
              <p>Best regards,<br/>TheNST Team</p>
            </div>
          `;
        break;

      case "hired":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4f46e5;">New Hiring Request on TheNST 📩</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>A recruiter has shown interest in your profile on <strong>TheNST</strong>.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>
              🏢 <strong>Company:</strong> ${data.companyName}<br/>
              👤 <strong>Recruiter:</strong> ${data.hrName}
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>You have received a hiring request for a potential opportunity.</p>
            <p>To proceed further, please log in to your account. Once you accept the request, you will be able to connect and communicate directly with the recruiter on the platform.</p>
            <div style="margin: 30px 0;">
              <a href="https://thenst.co/login" style="display:inline-block; background:#5b5bd6; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:500;">Login to View Request</a>
            </div>
            <p>We encourage you to review the opportunity and take the next step accordingly.</p>
            <p>Regards,<br/><strong>TheNST Team</strong></p>
          </div>
        `;
        break;

      case "acceptance":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #10b981;">Hiring Request Accepted ✅</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Good news! The ${isAgency ? "security agency" : "security professional"} you reached out to has accepted your hiring request on <strong>TheNST</strong>.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>
              👤 <strong>${isAgency ? "Agency Name" : "Candidate"}:</strong> ${data.candidateName}<br/>
              ${isAgency && data.contactPerson ? `👤 <strong>Contact Person:</strong> ${data.contactPerson}<br/>` : ""}
              🏢 <strong>Recruiter Company:</strong> ${data.companyName}
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>You can now proceed to connect and communicate directly with the ${isAgency ? "agency" : "candidate"} through the platform to take the hiring process forward.</p>
            <div style="margin: 30px 0;">
              <a href="https://thenst.co/login" style="display:inline-block; background:#5b5bd6; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:500;">Login to Continue</a>
            </div>
            <p>We wish you a smooth and successful hiring experience.</p>
            <p>Regards,<br/><strong>TheNST Team</strong></p>
          </div>
        `;
        break;

      case "hiring_rejection":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #ef4444;">Hiring Request Update</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>We would like to inform you that the ${isAgency ? "security agency" : "security professional"} you reached out to has declined your hiring request on <strong>TheNST</strong>.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>
              👤 <strong>${isAgency ? "Agency Name" : "Candidate"}:</strong> ${data.candidateName}<br/>
              ${isAgency && data.contactPerson ? `👤 <strong>Contact Person:</strong> ${data.contactPerson}<br/>` : ""}
              🏢 <strong>Recruiter Company:</strong> ${data.companyName}
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>While this opportunity was not accepted, we encourage you to explore other verified ${isAgency ? "agencies" : "professionals"} available on the platform to meet your hiring requirements.</p>
            <div style="margin: 30px 0;">
              <a href="https://thenst.co/login" style="display:inline-block; background:#5b5bd6; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:500;">Explore More Options</a>
            </div>
            <p>We are here to support your hiring needs and help you find the right match.</p>
            <p>Regards,<br/><strong>TheNST Team</strong></p>
          </div>
        `;
        break;

      case "hiring_success":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4f46e5;">Congratulations! 🎉</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>We are pleased to inform you that the deal with <strong>${data.companyName}</strong> has been successfully finalized through <strong>TheNST</strong>.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>
              🏢 <strong>Recruiter Company:</strong> ${data.companyName}<br/>
              👤 <strong>Contact Person:</strong> ${data.hrName}<br/>
              📧 <strong>Email:</strong> ${data.hrEmail || "the platform"}
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>The ${isAgency ? "partnership" : "hiring"} has been officially confirmed by the recruiter. You can now log in to your account to view further details and manage the next steps.</p>
            <div style="margin: 30px 0;">
              <a href="https://thenst.co/login" style="display:inline-block; background:#5b5bd6; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:500;">Login to Dashboard</a>
            </div>
            <p>We congratulate you on this successful collaboration and wish you the best.</p>
            <p>Regards,<br/><strong>TheNST Team</strong></p>
          </div>
        `;
        break;

      case "application_accepted":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>We are pleased to inform you that your application for the position at <strong>${data.companyName}</strong> has been <strong>successfully shortlisted</strong>.</p>
            <p>The recruiting team at <strong>${data.companyName}</strong> has reviewed your profile and found it suitable for their requirements. They may reach out to you shortly regarding the next steps in the hiring process, which may include further discussions or interviews.</p>
            <p>In the meantime, we encourage you to keep exploring and applying to other relevant opportunities available on TheNST platform to maximize your career prospects.</p>
            <p>Congratulations on being selected, and we wish you the very best for the upcoming process.</p>
            <br/>
            <p>Best regards,<br/><strong>Team TheNST</strong></p>
          </div>
        `;
        break;

      case "application_received":
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for applying for the position at <strong>${data.companyName}</strong> through TheNST platform.</p>
            <p>We have successfully received your application. The recruiting team at <strong>${data.companyName}</strong> will review your profile, and if your qualifications match their requirements, they will reach out to you for the next steps.</p>
            <p>In the meantime, we encourage you to continue exploring and applying to other relevant opportunities available on our platform to maximize your chances.</p>
            <p>We appreciate your interest and wish you the best in your job search.</p>
            <br/>
            <p>Best regards,<br/><strong>Team TheNST</strong></p>
          </div>
        `;
        break;

      default:
        return NextResponse.json({ success: false, error: "Invalid template" }, { status: 400 });
    }

    // Brevo API Payload - Dynamic Sender Routing
    let senderEmail = "hiring@thenst.co"; // Default to hiring
    const administrativeTemplates = ["welcome", "approval", "rejection"];
    
    if (administrativeTemplates.includes(template)) {
      senderEmail = "noreply@thenst.co";
    }

    const payload = {
      sender: {
        name: "TheNST",
        email: senderEmail
      },
      to: [
        { email: to.trim(), name: fullName ? fullName.trim() : "User" }
      ],
      subject: subject,
      htmlContent: htmlContent
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API error:", errorData);
      return NextResponse.json(
        { success: false, error: "Failed to send email via Brevo" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" });

  } catch (error: any) {
    console.error(`[Email Service Error] Template: ${templateName}, To: ${toEmail}, Error:`, error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
