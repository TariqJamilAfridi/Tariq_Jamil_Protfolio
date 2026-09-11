# 🚀 Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Framer Motion featuring a professional contact form powered by EmailJS.

## ✨ Features

- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 🌓 **Dark Mode** - Seamless light/dark theme toggle
- 📱 **Fully Responsive** - Optimized for all devices
- 📧 **Contact Form** - EmailJS integration for direct email delivery
- ⚡ **Fast Performance** - Built with Vite for lightning-fast builds
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- EmailJS account (free - for contact form)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up EmailJS** (for contact form)
   - See [EMAILJS_SETUP_GUIDE.md](./EMAILJS_SETUP_GUIDE.md) for detailed instructions
   - Quick setup: [EMAILJS_QUICK_SETUP.txt](./EMAILJS_QUICK_SETUP.txt)
   
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env and add your EmailJS credentials:
   # VITE_EMAILJS_PUBLIC_KEY=your_public_key
   # VITE_EMAILJS_SERVICE_ID=your_service_id
   # VITE_EMAILJS_TEMPLATE_ID=your_template_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Navigate to `http://localhost:5173`

## 📧 Contact Form Setup

The contact form uses EmailJS to send messages directly to your email inbox - **no backend required!**

### Quick Setup (10 minutes):
1. Sign up at [EmailJS.com](https://www.emailjs.com/) (free tier: 200 emails/month)
2. Connect your email service (Gmail recommended)
3. Create an email template
4. Get your credentials (Public Key, Service ID, Template ID)
5. Add them to `.env` file
6. Restart dev server

**📚 Detailed Guide:** See [EMAILJS_SETUP_GUIDE.md](./EMAILJS_SETUP_GUIDE.md)

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables (same as above)

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, resume
│   ├── components/     # React components
│   │   ├── About/
│   │   ├── Contact/    # Contact form with EmailJS
│   │   ├── Hero/
│   │   ├── Navbar/
│   │   ├── Projects/
│   │   ├── Skills/
│   │   └── common/     # Reusable components
│   ├── context/        # React context (Theme)
│   ├── data/           # Static data (profile, projects, skills)
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── .env                # Environment variables (gitignored)
├── .env.example        # Environment template
└── vite.config.js      # Vite configuration
```

## 🎨 Customization

### Update Your Information
Edit the data files in `src/data/`:
- `profile.js` - Personal information, contact details
- `projects.js` - Your projects and portfolio items
- `skills.js` - Technical skills and proficiency levels
- `experience.js` - Work experience and education

### Change Colors/Theme
- Edit `src/styles/global.css` for global styles
- Modify Tailwind classes in components for UI changes

### Add Sections
1. Create a new component in `src/components/`
2. Import and add to `src/App.jsx`
3. Update navigation in `src/data/navigation.js`

## 🧰 Technologies Used

- **React 18** - UI library
- **Vite 8** - Build tool and dev server
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **EmailJS** - Email delivery service
- **React Icons** - Icon library

## 📜 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## 🔒 Environment Variables

Required for contact form functionality:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

**⚠️ Important:** Never commit your `.env` file to version control. It's already in `.gitignore`.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

If you encounter any issues:
1. Check the [EmailJS Setup Guide](./EMAILJS_SETUP_GUIDE.md)
2. Review [Contact Form Flow](./CONTACT_FORM_FLOW.md)
3. Open an issue on GitHub

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

Built with ❤️ using React + Vite
