const User = require('../models/user.model');
const nodemailer = require('nodemailer');





// @desc    Toggle Save/Unsave an Athlete
// @route   POST /api/users/save/:athleteId
exports.toggleSavePlayer = async (req, res) => {
    try {
        const recruiterId = req.user._id; // From authMiddleware
        const athleteId = req.params.athleteId; // From the URL

        // 1. Fetch the recruiter and the target athlete
        const recruiter = await User.findById(recruiterId);
        const athlete = await User.findById(athleteId);

        // 2. Validate the athlete exists and is actually an athlete
        if (!athlete || athlete.role !== 'athlete') {
            return res.status(404).json({ message: 'Athlete not found' });
        }

        // 3. Check if the athlete is already in the recruiter's saved list
        const isSaved = recruiter.savedPlayers.includes(athleteId);

        if (isSaved) {
            // If already saved, remove them (Unsave)
            recruiter.savedPlayers = recruiter.savedPlayers.filter(
                (id) => id.toString() !== athleteId
            );
        } else {
            // If not saved, add them
            recruiter.savedPlayers.push(athleteId);
        }

        // 4. Save the updated recruiter document
        await recruiter.save();

        res.status(200).json({ 
            message: isSaved ? 'Player removed from saved list' : 'Player saved successfully',
            savedPlayers: recruiter.savedPlayers 
        });

    } catch (error) {
        console.error("Save Player Error:", error);
        res.status(500).json({ message: 'Server error saving player' });
    }
};

// @desc    Get a Recruiter's Saved Players Dashboard
// @route   GET /api/users/saved
exports.getSavedPlayers = async (req, res) => {
    try {
        // Find the recruiter and fully populate the saved players' details
        const recruiter = await User.findById(req.user._id).populate(
            'savedPlayers', 
            'name location sport playerRole subRole style bio trustScore' // Fields we want to show on the dashboard
        );

        res.status(200).json(recruiter.savedPlayers);
    } catch (error) {
        console.error("Fetch Saved Players Error:", error);
        res.status(500).json({ message: 'Server error fetching saved players' });
    }
};

// @desc    Send a trial invite email to an athlete
// @route   POST /api/users/invite/:athleteId
exports.sendTrialInvite = async (req, res) => {
    try {
        // 1. Move the transporter INSIDE the function so it reads the .env variables at RUNTIME
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 465,
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const athleteId = req.params.athleteId;
        const recruiterId = req.user._id;

        // 2. Fetch both users
        const athlete = await User.findById(athleteId);
        const recruiter = await User.findById(recruiterId);

        if (!athlete || athlete.role !== 'athlete') {
            return res.status(404).json({ message: 'Athlete not found' });
        }

        const { customMessage, trialDate } = req.body;
        const dateString = trialDate ? `We would like to see you on: ${trialDate}` : 'We will reach out with specific dates soon.';

        // 3. Construct the Email
        const mailOptions = {
            from: "abhinavanil800@gmail.com",
            to: athlete.email, 
            subject: `🎉 Trial Invitation from ${recruiter.organization}!`,
            html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f5f7; padding: 40px 20px; color: #333333;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
                    
                    <div style="background-color: #2563eb; padding: 35px 40px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1.5px;">SCOUTRIX</h1>
                        <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Official Trial Invitation</p>
                    </div>

                    <div style="padding: 40px;">
                        <h2 style="margin-top: 0; color: #111827; font-size: 22px;">Hello ${athlete.name},</h2>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                            Great news! <strong>${recruiter.name}</strong> from <strong>${recruiter.organization}</strong> has reviewed your Scoutrix profile and AI Stat Card. They were highly impressed by your skills as a <strong>${athlete.playerRole}</strong> and want to invite you for an official trial.
                        </p>

                        <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 20px 25px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                            <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Message from the Scout</p>
                            <p style="margin: 0; font-size: 16px; font-style: italic; color: #1e293b; line-height: 1.5;">
                                "${customMessage || 'We look forward to seeing you in action!'}"
                            </p>
                        </div>

                        <table style="width: 100%; margin-bottom: 30px; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
                                    <strong style="color: #0f172a; font-size: 15px;">🗓️ Trial Details</strong>
                                </td>
                                <td style="padding: 14px 0; border-bottom: 1px solid #e2e8f0; color: #475569; text-align: right; font-size: 15px;">
                                    ${trialDate || 'Dates TBD soon'}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
                                    <strong style="color: #0f172a; font-size: 15px;">📞 Contact Rep</strong>
                                </td>
                                <td style="padding: 14px 0; border-bottom: 1px solid #e2e8f0; color: #475569; text-align: right; font-size: 15px;">
                                    ${recruiter.phoneNumber}
                                </td>
                            </tr>
                        </table>

                        <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                            Please reply directly to this email or reach out via the phone number above to confirm your attendance.
                        </p>

                        <p style="font-size: 16px; line-height: 1.6; color: #111827; margin-top: 35px; font-weight: bold;">
                            Keep up the great work,<br>
                            <span style="color: #2563eb;">The Team Voyagers</span>
                        </p>
                    </div>

                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                            Powered by the Scoutrix AI Scouting Network
                        </p>
                    </div>

                </div>
            </div>
            `
        };

        // 4. Send the Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: `Invite successfully sent to ${athlete.name}!` });

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: 'Server error sending invite' });
    }
};