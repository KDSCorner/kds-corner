# Git Commands Cheat Sheet

## 📋 Most Used Commands (Copy & Paste Ready)

### Daily Workflow
```bash
# Check status
git status

# See changes
git diff

# Add all changes
git add .

# Commit with message
git commit -m "Your descriptive message here"

# Push to GitHub
git push origin main

# All in one (add, commit, push)
git add . && git commit -m "Your message" && git push origin main
```

### Before Starting Work
```bash
# Get latest changes from GitHub
git pull origin main

# Check current status
git status
```

### After Making Changes
```bash
# Test build first (IMPORTANT!)
npm run build

# If build successful:
git add .
git commit -m "Add: description of what you added"
git push origin main
```

## 🔄 Common Scenarios

### Scenario 1: Quick Fix
```bash
# Make your changes
# Test: npm run build
git add .
git commit -m "Fix: describe what you fixed"
git push origin main
```

### Scenario 2: New Feature
```bash
# Make your changes
# Test: npm run dev and npm run build
git add .
git commit -m "Add: new feature description"
git push origin main
```

### Scenario 3: Update Existing Feature
```bash
# Make your changes
# Test: npm run build
git add .
git commit -m "Update: describe what you updated"
git push origin main
```

## 🚨 Emergency Commands

### Undo Uncommitted Changes
```bash
# Undo changes to specific file
git checkout -- filename.tsx

# Undo all uncommitted changes
git checkout -- .
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
# Your changes are still there, just uncommitted
```

### Undo Last Commit (Remove Changes)
```bash
git reset --hard HEAD~1
# WARNING: This deletes your changes permanently!
```

### Force Push (Use Carefully!)
```bash
git push -f origin main
# Only use if you're sure and working alone
```

## 📝 Commit Message Templates

### Good Commit Messages
```bash
git commit -m "Add: user registration form validation"
git commit -m "Fix: dark mode toggle not saving state"
git commit -m "Update: improve mobile responsive design"
git commit -m "Remove: unused CSS classes and imports"
git commit -m "Refactor: organize dashboard components"
```

### By Category
```bash
# New features
git commit -m "Add: product search functionality"
git commit -m "Add: user profile image upload"

# Bug fixes
git commit -m "Fix: login form validation error"
git commit -m "Fix: mobile navigation menu overlap"

# Updates/Improvements
git commit -m "Update: improve error handling"
git commit -m "Update: enhance loading animations"

# Style changes
git commit -m "Style: improve button hover effects"
git commit -m "Style: adjust spacing in dashboard"

# Documentation
git commit -m "Docs: add setup instructions"
git commit -m "Docs: update API documentation"
```

## 🔍 Useful Info Commands

### Check History
```bash
# See recent commits
git log --oneline

# See last 5 commits
git log --oneline -5

# See changes in last commit
git show
```

### Check Remote Info
```bash
# See remote URL
git remote -v

# See branch info
git branch -a
```

### Check Differences
```bash
# See unstaged changes
git diff

# See staged changes
git diff --cached

# Compare with last commit
git diff HEAD
```

## 🌿 Branch Commands (Advanced)

### Working with Branches
```bash
# Create new branch
git checkout -b feature/new-feature

# Switch to branch
git checkout main

# Push new branch
git push origin feature/new-feature

# Merge branch to main
git checkout main
git merge feature/new-feature
git push origin main

# Delete branch
git branch -d feature/new-feature
```

## ⚠️ Problem Solving

### Problem: Push Rejected
```bash
# Solution: Pull first, then push
git pull origin main
git push origin main
```

### Problem: Merge Conflict
```bash
# 1. Edit conflicted files
# 2. Remove conflict markers (<<<<, ====, >>>>)
# 3. Save files
git add .
git commit -m "Resolve merge conflict"
git push origin main
```

### Problem: Wrong Commit Message
```bash
# Change last commit message
git commit --amend -m "New correct message"
git push -f origin main  # Only if not pushed yet
```

### Problem: Forgot to Add Files
```bash
# Add forgotten files to last commit
git add forgotten-file.tsx
git commit --amend --no-edit
```

## 🎯 Daily Checklist

### Before You Start Coding
- [ ] `git status` (check clean state)
- [ ] `git pull origin main` (get latest)
- [ ] `npm run dev` (start development)

### Before You Commit
- [ ] `npm run build` (test build)
- [ ] Check changes in browser
- [ ] `git status` (see what's changed)
- [ ] Write clear commit message

### After You Commit
- [ ] `git push origin main`
- [ ] Check deployment logs
- [ ] Test live site

## 💡 Pro Tips

1. **Always test build before pushing**: `npm run build`
2. **Use descriptive commit messages**: Others (and future you) will thank you
3. **Commit often**: Small commits are better than big ones
4. **Pull before starting work**: Avoid conflicts
5. **Use branches for big features**: Keep main stable

## 🚀 One-Liner Commands

```bash
# Quick commit and push
git add . && git commit -m "Quick fix" && git push origin main

# Update from remote and show status
git pull origin main && git status

# Show recent commits with details
git log --oneline --graph --decorate -10

# Undo last commit but keep changes
git reset --soft HEAD~1

# Show what changed in last commit
git show --stat
```

---

**Save this file for quick reference! 📌**
