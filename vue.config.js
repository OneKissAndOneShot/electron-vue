module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "fi.app",
        productName: "TodoList",
        copyright: "Copyright © 2020",
        asar: true,
        directories: {
          output: "./dist_msi"
        },
        win: {
          icon: "./public/fi.ico",
          target: [
            {
              target: "nsis",
              arch: ["x64"]
            }
          ]
        },
        nsis: {
          oneClick: false,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          installerIcon: "./public/fi.ico",
          uninstallerIcon: "./public/fi.ico",
          installerHeaderIcon: "./public/fi.ico",
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: "TodoList"
        }
      }
    }
  }
};
