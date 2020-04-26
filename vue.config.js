module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "appId": "fi.app",
        "productName": "test",
        "copyright": "Copyright © 2019",
        "directories": {
          "output": "./dist_msi"
        },
        "win": {
          "icon": "./fi.ico",
          "target": [
            {
              "target": "nsis",
              "arch": [
                "x64"
              ]
            }
          ]
        },
        "nsis": {
          "oneClick": false,
          "allowElevation": true,
          "allowToChangeInstallationDirectory": true,
          "installerIcon": "./fi.ico",
          "uninstallerIcon": "./fi.ico",
          "installerHeaderIcon": "./fi.ico",
          "createDesktopShortcut": true,
          "createStartMenuShortcut": true,
          "shortcutName": "test",
        }
      }
    }
  }
}