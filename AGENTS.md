# Repository guidance

## Project structure

- Treat `Frontend/` and `Backend/` as separate npm projects; run package commands from the directory they belong to.
- Keep browser UI and client-side Socket.IO handling in `Frontend/src/`. Keep Express, Socket.IO, and MongoDB code in `Backend/src/`.
- Use `Frontend/src/class/interfaces.ts` for shared frontend shapes. The persisted chat shape and Mongoose schema live in `Backend/src/models/Chat.ts`.

## Development

- Install dependencies with `npm ci` in both `Frontend/` and `Backend/`.
- Start the backend with `cd Backend && npm run dev`; it requires MongoDB at `mongodb://localhost:27017/chat-app` and listens on port `3002`.
- Start the frontend with `cd Frontend && npm run dev`. Its backend URL is defined in `Frontend/src/assets/data.ts`.
- Preserve the current Socket.IO event contract unless updating both sides together: the client emits `newMessage`, and the server emits `initChatView` and `messageView`.

## Implementation rules

- Keep TypeScript strict and avoid introducing `any` or suppressing compiler or ESLint errors.
- Validate user-controlled data at the server boundary before persisting it. Do not trust client-supplied chat or sender fields.
- Keep database access in `Backend/src/models/` and connection setup in `Backend/src/db.ts`; do not place persistence logic in React components.
- Update CORS and the frontend server URL together when changing local ports or deployment origins. Do not commit credentials or environment-specific secrets.
- Do not edit generated output or dependency directories (`dist/`, `node_modules/`, or TypeScript build-info files).

## Validation

- For frontend changes, run `cd Frontend && npm run lint && npm run build`.
- For backend changes, run `cd Backend && npm run build`.
- There is currently no automated test command. Add focused tests and an npm script when introducing test infrastructure; do not claim tests ran when only builds or linting ran.
- For cross-stack messaging changes, manually verify initial history loading, sending a message, persistence after reconnect, and delivery to multiple connected clients.
