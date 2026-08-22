import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema(
  {
    instituteName: {
      type: String,
      default: 'RATNAM COACHING CENTRE',
    },
    establishedYear: {
      type: Number,
      default: 1998,
    },
    primaryTagline: {
      type: String,
      default: "Don't Sit Like a Rock, Work Like a Clock.",
    },
    secondaryTagline: {
      type: String,
      default: 'Building Careers Through Quality Education Since 1998.',
    },
    supportingHeroText: {
      type: String,
      default: 'Competitive examination coaching, school daily tuitions, distance education support and student services under one educational institution.',
    },
    motivationalHeading: {
      type: String,
      default: "Don't Sit Like a Rock, Work Like a Clock.",
    },
    motivationalSubtext: {
      type: String,
      default: 'Your goals need action. Your preparation needs consistency. Your success needs discipline.',
    },
    primaryPhone: {
      type: String,
      default: 'Contact details will be updated soon',
    },
    secondaryPhone: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: 'contact@ratnamcoaching.com',
    },
    address: {
      type: String,
      default: 'Main Road, Bhimavaram, West Godavari District, Andhra Pradesh - 534201, India',
    },
    officeHours: {
      type: String,
      default: 'Monday – Saturday: 7:00 AM – 8:30 PM | Sunday: 8:00 AM – 1:00 PM',
    },
    googleMapsEmbedUrl: {
      type: String,
      default: '',
    },
    govtRegistrationNote: {
      type: String,
      default: 'Registered educational institute under the Government of Andhra Pradesh.',
    },
    andhraUniversityDisclaimer: {
      type: String,
      default: 'Ratnam Coaching Centre provides independent coaching, academic guidance, and admission support for distance education programs of Andhra University. Official degrees and examinations are conducted solely by Andhra University.',
    },
    certificateAssistanceDisclaimer: {
      type: String,
      default: 'Ratnam Coaching Centre assists students with document retrieval guidance and university follow-up. Official educational certificates are issued directly by the respective universities and examination boards.',
    },
    timeline: [
      {
        year: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);
export default SiteSetting;
