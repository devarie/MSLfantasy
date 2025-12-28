# Player Avatars

This folder contains avatar images for all players in the MSL Fantasy game.

## File Naming Convention

Avatar images should be named using the following format:
- Use lowercase letters
- Replace spaces with hyphens
- Use `.jpg`, `.jpeg`, `.png`, or `.webp` format

Examples:
- `dylan-polak.jpg`
- `player-name.webp`

## Image Specifications

- **Recommended size**: 200x200 pixels (square)
- **Format**: JPG, PNG, or WebP
- **File size**: Keep under 200KB for optimal loading

## Adding New Avatars

1. Save the player's avatar image in this folder
2. Update the player's avatar path in `src/data/playerBios.ts`:
   ```typescript
   'Player Name': {
     name: 'Player Name',
     avatar: '/images/avatars/player-name.jpg',
     bio: 'Player bio text here...'
   }
   ```

## Placeholder

If no avatar is available, the system will automatically display a default user icon.
