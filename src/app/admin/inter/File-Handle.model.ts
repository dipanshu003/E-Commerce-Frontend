// file-handle.interface.ts

import { SafeUrl } from "@angular/platform-browser";

export interface FileHandle {
  file: File;
  url: string | SafeUrl;
}
