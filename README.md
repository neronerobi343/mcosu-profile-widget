# McOsu Profile Widget

This widget displays the player stats and optionally top/recent scores from the JSON resulting from [mcosu-stats-parser](https://github.com/neronerobi343/mcosu-stats-parser) in a static HTML website.

The structure for how songs are displayed is similar to that of old osu! profile pages (pre-2017).

## Usage

**NOTE:** There is a strict dependency on [mcosu-stats-parser](https://github.com/neronerobi343/mcosu-stats-parser) as I use the JSON data to dynamically create all the elements using JS.

1. Run the `mcocu-stats-parser` on `scores.db` from your McOsu installation to get the **playerStats.json** file with all of the necessary data.
2. Download the **mcosu-widget.js** file (through `git clone` or downloading it directly).
3. Place **mcosu-widget.js** and **playerStats.json** file somewhere inside your static site's directory.
4. In **mcosu-widget.js**, make sure that `JSON_PATH` points to the path to **playerStats.json**

    ```JS
    const JSON_PATH = "./playerStats.json" // in same directory as mcosu-widget.js
    ```
5. (Optional) You can add a profile image by adding a path to `PROFILE_IMAGE_PATH`. If left as an empty string (`""`), it will create the player stats without the image in mind.

    ```JS
    const PROFILE_IMG_PATH = "./profile.png"
    ```

6. In an HTML file, add:
    ```HTML
    ...
    <body>
       <div id="mcosu-widget"></div>
        <script type="text/javascript" src="mcosu-widget.js"></script> 
    </body>
    ...
    ```

From here, the widget will build the HTML dynamically from `playerStats.json` to display player stats and their top/recent scores if given. This allows for updating player stats without having to edit static HTML over and over.

## Sample

A sample site with the widget installed with proper styling can be found [here](https://neronerobi343.github.io/mcosu-profile-widget/).

You can view **widget.css** to get started with styling the widget's HTML output.