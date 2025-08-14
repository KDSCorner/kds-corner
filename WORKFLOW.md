# ⚡ Simple Daily Workflow

## 🎯 The 5-Step Process

### 1. **Start Development**
```bash
npm run dev
```
Open http://localhost:3000

### 2. **Make Your Changes**
- Edit files in `app/`, `components/`, or `lib/`
- Save changes
- See results in browser

### 3. **Test Build**
```bash
npm run build
```
**IMPORTANT**: Must pass before pushing!

### 4. **Commit & Push**
```bash
git add .
git commit -m "Brief description of what you changed"
git push origin main
```

### 5. **Check Deployment**
- Visit your live website
- Deployment happens automatically

---

## 📋 Copy-Paste Commands

### Daily Commands
```bash
# Start working
npm run dev

# Test build
npm run build

# Quick commit and push
git add . && git commit -m "Your change description" && git push origin main
```

### Check what's changed
```bash
git status
```

### Emergency undo
```bash
# Undo uncommitted changes
git checkout -- .

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

---

## 🚨 Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| Build fails | Fix TypeScript errors shown |
| Push rejected | Run `git pull origin main` first |
| Website broken | Check browser console for errors |
| Dark mode not working | Check `useDarkMode()` in component |

---

## 📝 Commit Message Examples

```bash
git commit -m "Add new product page"
git commit -m "Fix mobile navigation bug"
git commit -m "Update user profile design"
git commit -m "Remove unused code"
```

---

## 🎯 That's It!

**Remember**: Always `npm run build` before `git push origin main`

For detailed info, check:
- **DEVELOPMENT.md** - Full development guide
- **GIT-CHEATSHEET.md** - All Git commands
- **README.md** - Project overview
