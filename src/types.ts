export interface ThemeResponse {
  theme: Theme;
}

export interface Theme {
  id: string;
  name: string;
  localizedName: string;
  background: Background;
  boardStyle: BoardStyle;
  pieceSet: PieceSet;
  soundSet: SoundSet;
}

export interface Background {
  id: string;
  name: string;
  isDefault: boolean;
  localizedName: string;
  displayPriority: number;
  previewImage: string;
  color: Color;
}

export interface Color {
  hexCode: string;
}

export interface BoardStyle {
  id: string;
  name: string;
  legacyId: number;
  localizedName: string;
  displayPriority: number;
  previewImage: PreviewImage;
  image: string;
  image3d: Image3D;
  coordinateColorDark: string;
  coordinateColorLight: string;
  highlightColor: string;
}

export interface Image3D {
  board: string;
  coordinates: string;
}

export interface PreviewImage {
  square: string;
  linear: string;
}

export interface PieceSet {
  id: string;
  name: string;
  legacyId: number;
  localizedName: string;
  displayPriority: number;
  previewImage: PreviewImage;
  images: Images;
  perspective: string;
}

export interface Images {
  whitePawn: string;
  whiteKnight: string;
  whiteBishop: string;
  whiteRook: string;
  whiteQueen: string;
  whiteKing: string;
  blackPawn: string;
  blackKnight: string;
  blackBishop: string;
  blackRook: string;
  blackQueen: string;
  blackKing: string;
}

export interface SoundSet {
  id: string;
  name: string;
  isDefault: boolean;
  legacyId: number;
  localizedName: string;
  displayPriority: number;
  soundFiles: SoundFiles;
}

export interface SoundFiles {
  mp3: Mp3;
  ogg: Ogg;
  wav: Ogg;
  webm: Ogg;
}

export interface Mp3 {
  notification: string;
  premove: string;
  "event-warning": string;
  notify: string;
  "draw-offer": string;
  "puzzle-correct-2": string;
  _archive: string;
  "move-self-check": string;
  "event-start": string;
  "move-self": string;
  boom: string;
  scatter: string;
  "game-start": string;
  incorrect: string;
  achievement: string;
  "lesson-fail": string;
  capture: string;
  "puzzle-correct": string;
  promote: string;
  click: string;
  tenseconds: string;
  "move-opponent": string;
  lesson_pass: string;
  shoutout: string;
  castle: string;
  illegal: string;
  "event-end": string;
  "game-lose": string;
  "puzzle-wrong": string;
  "move-opponent-check": string;
  "game-win-long": string;
  "game-draw": string;
  correct: string;
  decline: string;
  "game-lose-long": string;
  "move-check": string;
  "game-end": string;
}

export interface Ogg {
  promote: string;
  click: string;
  premove: string;
  "move-opponent": string;
  notify: string;
  "draw-offer": string;
  tenseconds: string;
  castle: string;
  illegal: string;
  "move-self": string;
  correct: string;
  "game-start": string;
  incorrect: string;
  capture: string;
  "move-check": string;
  "game-end": string;
}

export interface PopupResponse {
  avatarUrl: string;
  bestRating: number;
  bestRatingType: string;
  chessTitle: null;
  isEnabled: boolean;
  isStaff: boolean;
  isGuest: boolean;
  countryId: number;
  membership: Membership;
  joinDate: string;
  lastLoginDate: string;
  firstName: string;
  lastName: string;
  userId: number;
  isFideVerified: boolean;
  isCoach: boolean;
  isModerator: boolean;
  countryName: string;
  isMessageable: boolean;
  isFriendRequestFromUserExists: boolean;
  canReceiveGiftMembership: boolean;
  uuid: string;
  notMessageableReasonCode: string;
  areFriends: boolean;
  isTracked: boolean;
  isBlocked: boolean;
  canBeBlocked: boolean;
  isFriendRequestExists: boolean;
  blocksCurrentUser: boolean;
  onlineStatus: string;
  flair: Flair;
  topPuzzleRushScore: number;
  topPuzzleRushScoreType: string;
  isStreamer: boolean;
  isTopBlogger: boolean;
  allowFriendRequests: boolean;
}

export interface Flair {
  id: string;
  images: Images;
}

export interface Images {
  png: string;
  svg: string;
  lottie: string;
}

export interface Membership {
  level: number;
  name: string;
  code: string;
  vacation_add_days: number;
  vacation_cap_days: number;
  vacation_accrue_days: number;
}

// need to temporarily enable demo for testing on localhost
// https://cors-anywhere.herokuapp.com/corsdemo
const proxy = "https://cors-anywhere.herokuapp.com/";

const payload = {
  platform: "PLATFORM_WEB",
  boardSize: 200,
  piecesSize: 150,
  userId: "f56cca28-90a4-11e2-8004-000000000000",
};

export async function getUserPopup(username: string): Promise<PopupResponse> {
  const targetUrl = "https://www.chess.com/callback/user/popup/" + username;

  const res = await fetch(proxy + targetUrl);
  if (!res.ok) throw new Error("error getting user");
  const json = await res.json();
  const data = json as PopupResponse;
  return data;
}

export async function getTheme(userId: string): Promise<ThemeResponse> {
  const body = { ...payload, userId };
  const targetUrl =
    "https://www.chess.com/rpc/chesscom.themes.v2.ThemesService/GetActiveTheme";

  const res = await fetch(proxy + targetUrl, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en_US",
      "connect-protocol-version": "1",
      "content-type": "application/json",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    },
    body: JSON.stringify(body),
    method: "POST",
  });
  const json = await res.json();
  const result = json as ThemeResponse;
  return result;
}
