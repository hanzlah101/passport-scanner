# 🛂 Passport Scanner

A modern, AI-powered passport scanner built with Next.js that uses OCR technology to extract and parse Machine Readable Zone (MRZ) data from passport images.

## ✨ Features

- **📸 Image Upload**: Drag and drop or click to upload passport images
- **🔍 OCR Processing**: Advanced OCR using Tesseract.js with multi-language support
- **📊 MRZ Parsing**: Automatic extraction and validation of passport data
- **🎨 Modern UI**: Beautiful, responsive interface with dark/light theme support
- **⚡ Real-time Processing**: Live progress tracking with animated feedback
- **✅ Data Validation**: Comprehensive validation of required passport fields
- **🌍 Multi-language**: Support for English, French, Spanish, Arabic, Chinese, and Urdu

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with CSS variables
- **UI Components**: Custom components built with [Radix UI](https://www.radix-ui.com/)
- **OCR Engine**: [Tesseract.js](https://tesseract.projectnaptha.com/)
- **MRZ Parser**: [mrz](https://www.npmjs.com/package/mrz) library
- **File Upload**: [react-dropzone](https://react-dropzone.js.org/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hanzlah101/passport-scanner.git
   cd passport-scanner
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install

   # Using bun (recommended)
   bun install
   ```

3. **Start the development server**

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev

   # Using bun (recommended)
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

1. **Upload a Passport Image**
   - Drag and drop a passport image onto the upload zone
   - Or click "Choose File" to select from your device
   - Supported formats: JPG, PNG, WebP (max 10MB)

2. **Processing**
   - The app will automatically process the image using OCR
   - Progress is shown in real-time with visual feedback
   - Processing includes image preprocessing and text recognition

3. **View Results**
   - Extracted passport information is displayed in a structured format
   - Includes personal details, document information, and dates
   - Raw MRZ data is shown at the bottom for verification

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with CSS variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main application page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   └── ...
│   ├── navbar.tsx           # Navigation bar with theme toggle
│   ├── upload-dropzone.tsx  # File upload component
│   ├── parsing-progress.tsx # Progress indicator during processing
│   ├── parsing-error.tsx    # Error handling component
│   └── passport-details.tsx # Passport information display
├── hooks/
│   └── use-mrz-parser.ts    # Custom hook for MRZ parsing logic
├── lib/
│   ├── constants.ts         # App constants and configurations
│   ├── formatters.ts        # Data formatting utilities
│   ├── icons.ts             # Icon mappings for different fields
│   └── utils.ts             # General utility functions
└── types/
    └── index.ts             # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The app runs entirely client-side.

### Supported Languages

The OCR engine supports the following languages:

- English (eng)
- French (fra)
- Spanish (spa)
- Arabic (ara)
- Chinese Simplified (chi_sim)
- Urdu (urd)

### Image Requirements

- **Format**: JPEG, PNG, WebP
- **Size**: Maximum 10MB
- **Quality**: Clear, well-lit images work best
- **Orientation**: Passport should be properly oriented
- **MRZ Visibility**: Both MRZ lines must be clearly visible

## 📊 Features in Detail

### OCR Processing

- Advanced image preprocessing for better recognition
- Contrast enhancement and grayscale conversion
- Multi-language text recognition
- Confidence scoring for quality assessment

### MRZ Validation

- Validates presence of required fields (firstName, documentNumber, nationality, expirationDate)
- Checks MRZ format and structure
- Provides detailed error messages for missing or invalid data

### User Experience

- Responsive design works on all devices
- Dark/light theme support with system preference detection
- Smooth animations and transitions
- Real-time progress feedback
- Error handling with retry functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. **Code Style**: Follow the existing TypeScript and React patterns
2. **Components**: Use the established component structure with proper typing
3. **Styling**: Use Tailwind CSS classes and CSS variables for theming
4. **Testing**: Ensure your changes don't break existing functionality

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Tesseract.js](https://tesseract.projectnaptha.com/) for OCR functionality
- [MRZ](https://www.npmjs.com/package/mrz) library for passport data parsing
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/hanzlah101/passport-scanner/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

Built with ❤️ using Next.js and modern web technologies.
