# KDS Corner Development Guide

## 📁 Project Structure

```
KDSCorner/
├── app/                    # Next.js App Router
│   ├── admin/
│   │   ├── dashboard/      # Admin dashboard page
│   │   └── layout.tsx      # Admin layout with sidebar
│   ├── buyer/
│   │   ├── dashboard/      # Buyer dashboard page
│   │   └── layout.tsx      # Buyer layout with sidebar
│   ├── about/              # About page
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout (wraps entire app)
│   └── page.tsx            # Home page
├── components/
│   └── UserProfile.tsx     # User profile dropdown component
├── lib/
│   ├── auth-context.tsx    # Authentication context
│   ├── dark-mode-context.tsx # Dark mode context
│   ├── firebase.ts         # Firebase configuration
│   ├── db.ts              # Database utilities
│   ├── role-protection.tsx # Role-based protection
│   └── use-role-redirect.tsx # Role redirect hook
├── public/                 # Static files
│   ├── assets/images/      # Image assets
│   ├── scripts/            # JavaScript files
│   └── styles/            # CSS files
├── styles/                 # Additional stylesheets
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── netlify.toml         # Netlify deployment config
├── vercel.json          # Vercel deployment config
└── .gitignore           # Git ignore rules
```

## 🚀 Development Workflow

### 1. Setup Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in browser
```

### 2. Making Code Changes

#### Common Files to Edit:
- **Pages**: `app/*/page.tsx` - Individual pages
- **Layouts**: `app/*/layout.tsx` - Page layouts
- **Components**: `components/*.tsx` - Reusable components
- **Contexts**: `lib/*-context.tsx` - Global state management
- **Styles**: `app/globals.css`, `public/styles/*.css`

#### Example: Adding a new page
```bash
# Create new page directory
mkdir app/products

# Create page file
# Edit app/products/page.tsx
```

### 3. Testing Changes

```bash
# Run development server
npm run dev

# Test build (important before deploying!)
npm run build

# Check for TypeScript errors
npm run build
```

## 🔧 Git Workflow

### Basic Git Commands

#### Check Status
```bash
# See what files have changed
git status

# See detailed changes
git diff
```

#### Commit Changes
```bash
# Add all changed files
git add .

# Or add specific files
git add app/buyer/dashboard/page.tsx
git add components/UserProfile.tsx

# Commit with descriptive message
git commit -m "Add new feature: product search functionality"
```

#### Push to GitHub
```bash
# Push to main branch
git push origin main

# Force push (use with caution!)
git push -f origin main
```

### Git Workflow Examples

#### Example 1: Fix a Bug
```bash
# 1. Check current status
git status

# 2. Make your code changes
# Edit files...

# 3. Test locally
npm run build

# 4. Add and commit
git add .
git commit -m "Fix: Resolve dashboard loading issue"

# 5. Push to GitHub
git push origin main
```

#### Example 2: Add New Feature
```bash
# 1. Create feature branch (optional but recommended)
git checkout -b feature/new-product-page

# 2. Make changes
# Edit/create files...

# 3. Test
npm run dev
npm run build

# 4. Commit changes
git add .
git commit -m "Add: New product listing page with filters"

# 5. Push feature branch
git push origin feature/new-product-page

# 6. Merge to main (via GitHub PR or locally)
git checkout main
git merge feature/new-product-page
git push origin main
```

#### Example 3: Quick Hotfix
```bash
# 1. Quick fix
# Edit file...

# 2. Test
npm run build

# 3. Commit and push immediately
git add .
git commit -m "Hotfix: Remove console.log statements"
git push origin main
```

### Git Best Practices

#### Commit Message Format
```bash
# Good commit messages:
git commit -m "Add: User profile edit functionality"
git commit -m "Fix: Dark mode toggle not persisting"
git commit -m "Update: Improve responsive design on mobile"
git commit -m "Remove: Unused CSS classes"

# Bad commit messages:
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
```

#### Before Every Push
```bash
# Always test build before pushing
npm run build

# Check for errors
# If build fails, fix errors before pushing
```

### Undo Changes

#### Undo Uncommitted Changes
```bash
# Undo all changes to a file
git checkout -- app/page.tsx

# Undo all uncommitted changes
git checkout -- .

# Or use restore (newer Git)
git restore app/page.tsx
git restore .
```

#### Undo Last Commit (but keep changes)
```bash
git reset --soft HEAD~1
```

#### Undo Last Commit (and discard changes)
```bash
git reset --hard HEAD~1
```

## 🌟 Key Features & Architecture

### Dark Mode System
- **Context**: `lib/dark-mode-context.tsx`
- **Usage**: `const { isDarkMode, toggleDarkMode } = useDarkMode()`
- **Persistence**: Saved in localStorage

### Authentication System
- **Context**: `lib/auth-context.tsx`
- **Firebase**: `lib/firebase.ts`
- **Roles**: buyer, admin
- **Protection**: `lib/role-protection.tsx`

### Layout System
- **Root Layout**: `app/layout.tsx` (wraps entire app)
- **Admin Layout**: `app/admin/layout.tsx` (admin sidebar)
- **Buyer Layout**: `app/buyer/layout.tsx` (buyer sidebar)

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
/* Mobile: default styles */
/* Tablet: 768px and up */
/* Desktop: 1024px and up */

@media (max-width: 768px) {
  /* Mobile styles */
}

@media (min-width: 769px) {
  /* Desktop styles */
}
```

## 🚢 Deployment

### Automatic Deployment
Every push to `main` branch triggers automatic deployment on:
- **Netlify**: Configured via `netlify.toml`
- **Vercel**: Configured via `vercel.json`

### Manual Deployment

#### Netlify
1. Push to GitHub
2. Netlify auto-deploys
3. Check build logs if failed

#### Vercel
1. Push to GitHub
2. Vercel auto-deploys
3. Instant deployment

### Deployment Checklist
```bash
# Before deploying:
1. Test locally: npm run dev
2. Test build: npm run build
3. Check TypeScript errors
4. Test dark mode
5. Test responsive design
6. Commit and push
```

## 🐛 Common Issues & Solutions

### Build Errors

#### TypeScript Errors
```bash
# Error: Property doesn't exist
# Solution: Check prop names and types

# Error: Module not found
# Solution: Check import paths
npm run build  # to see detailed errors
```

#### CSS Errors
```bash
# Error: Invalid CSS property
# Solution: Check CSS property names
# Example: 'space' is not valid, use 'gap' instead
```

### Git Issues

#### Merge Conflicts
```bash
# When you see merge conflict:
1. Edit conflicted files manually
2. Remove conflict markers (<<<<, ====, >>>>)
3. git add .
4. git commit -m "Resolve merge conflict"
```

#### Authentication Issues
```bash
# If push is rejected:
git pull origin main  # first pull changes
git push origin main  # then push
```

## 📝 Quick Reference

### Daily Development Commands
```bash
# Start development
npm run dev

# Test build
npm run build

# Commit changes
git add .
git commit -m "Description of changes"
git push origin main

# Check status
git status
git log --oneline  # see recent commits
```

### File Editing Workflow
1. Open file in code editor
2. Make changes
3. Save file
4. Test in browser (`npm run dev`)
5. Test build (`npm run build`)
6. Commit and push if successful

### Emergency Commands
```bash
# If something breaks:
git log --oneline        # see recent commits
git reset --hard HEAD~1  # undo last commit
git push -f origin main  # force push (careful!)

# Or restore to working state:
git checkout main
git pull origin main     # get latest working version
```

---

## 🎯 Quick Start for Changes

1. **Make changes** to files
2. **Test**: `npm run build`
3. **Commit**: `git add . && git commit -m "Your message"`
4. **Push**: `git push origin main`
5. **Check deployment** on Netlify/Vercel

That's it! 🚀
