import DataStore from "lowdb";
import LodashId from "lodash-id";
import FileSync from "lowdb/adapters/FileSync";
import path from "path";
import fs from "fs-extra";
import { remote, app } from "electron";

const App = process.type === "renderer" ? remote.app : app;
const STOREPATH = App.getAppPath("userData");

if (process.type !== "renderer") {
  if (!fs.pathExistsSync(STOREPATH)) {
    fs.mkdirpSync(STOREPATH);
  }
}

const adapter = new FileSync(path.join(STOREPATH, "/data.json"));
const db = new DataStore(adapter);

db._.mixin(LodashId);

export default db;
