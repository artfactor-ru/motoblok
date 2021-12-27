const gulp = require("gulp");
const browserSync = require("browser-sync").create();

// Преобразует sass в css
const sass = require("gulp-sass");
// Обработчик ошибок
const plumber = require("gulp-plumber");
// Указывает в инспекторе пути к свойствам
const sourcemaps = require("gulp-sourcemaps");
// Для манипуляций с css файлом
const postcss = require("gulp-postcss");
// Добавляет префиксы к свойствам
const autoprefixer = require("autoprefixer");
// Минификатор css
const minifycss = require("gulp-csso");
// Минификатор js
const minifyjs = require("gulp-uglify");
// Переименование файла
const rename = require("gulp-rename");
// Удаляем каталог
const del = require("del");
// Для манипуляция с html файлами
const posthtml = require("gulp-posthtml");
// Подключение html файлов
const includehtml = require("posthtml-include");
// Оптимизация картинок
const imagemin = require("gulp-imagemin");
// // Оптимизация картинок webp
const webp = require("gulp-webp");
// Svg спрайты
const svgstore = require("gulp-svgstore");
// Объединение файлов
const concat = require("gulp-concat");

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// html
gulp.task("html", function() {
    return gulp.src("./source/*.html")
        .pipe(posthtml([
            includehtml({
                root: "./source" // корень откуда копировать
            })
        ]))
        .pipe(gulp.dest("./build"));
});

// Sass в CSS
gulp.task("css", function() {
    return gulp.src("./source/sass/style.scss") // берем scss файл
        .pipe(plumber()) // обрабатывает ошибки в scss файле
        .pipe(sourcemaps.init()) // инициализация map файла
        .pipe(sass()) // компиляция в css
        .pipe(postcss([
            autoprefixer() // добавляем префиксы
        ]))
        .pipe(sass({
            // includePaths: require('node-normalize-scss').with('other/path', 'another/path') 
            // - or - 
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(minifycss()) // минифицируем css файл
        .pipe(rename("style.min.css")) // переименование файла
        .pipe(sourcemaps.write(".")) // запись map файла в текущий каталог
        .pipe(gulp.dest("./build/css")) // кладем css файл
        .pipe(browserSync.stream()); // перезагружаем сервер
});

// Минификация js
gulp.task("minifyjs", function() {
    // return gulp.src("./source/js/**/*.js")
    // .pipe(babel())
    return browserify({ entries: './source/js/script.js', debug: true })
        .transform("babelify", { presets: ["@babel/preset-env"], plugins: ['@babel/transform-runtime'] })

    .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(minifyjs())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest("./build/js"));
});

// Оптимизация изображений
// gulp.task("image", function() {
//     return gulp.src("./build/img/**/*.{png,jpg,svg}")
//         // .pipe(imagemin([
//         //     imagemin.optipng({
//         //         optimizationLevel: 3 // уровень оптимизации
//         //     }),
//         //     imagemin.jpegtran({
//         //         progressive: true // прогрессивная загрузка картинки
//         //     }),
//         //     // imagemin.svgo({
//         //     //     plugins: [
//         //     //         { cleanupIDs: false },
//         //     //         { removeUselessDefs: false },
//         //     //         { removeViewBox: true },
//         //     //         { removeComments: true }
//         //     //     ]
//         //     // })
//         // ]))
//         .pipe(gulp.dest("./build/img"));
// });

// Оптимизация webp
// gulp.task("webp", function () {
//   return gulp.src("./build/img/**/*.{png,jpg}")
//     .pipe(webp({
//       quality: 90
//     }))
//     .pipe(gulp.dest("./build/img"));
// });

// svg спрайт
// gulp.task("sprite", function() {
//     return gulp.src("./source/img/**/icon-*.svg")
//         .pipe(svgstore({
//             inlineSvg: true
//         }))
//         .pipe(rename("sprite.svg"))
//         .pipe(gulp.dest("./build/img"));
// });


// gulp.task("sprite2", function() {
//     return gulp.src("./source/img/**/number-icon*.svg")
//         .pipe(svgstore({
//             inlineSvg: true
//         }))
//         .pipe(rename("sprite-number.svg"))
//         .pipe(gulp.dest("./build/img"));
// });

// gulp.task("sprite3", function() {
//     return gulp.src("./source/img/**/about-icon*.svg")
//         .pipe(svgstore({
//             inlineSvg: true
//         }))
//         .pipe(rename("sprite-about.svg"))
//         .pipe(gulp.dest("./build/img/sprite"));
// });

// Копируем файлы в build
gulp.task("copy", function() {
    return gulp.src([
            "./source/fonts/**/**",
            "./source/video/**/**",
            // "./source/js/libs/**/**",
            "./source/img/**/**",
            "./source/*.ico"
        ], {
            base: "./source" // корень откуда копировать
        })
        .pipe(gulp.dest("./build"));
});

// Удаляем каталог build
gulp.task("clean", function() {
    return del("./build");
});

// Сборка
gulp.task("build", gulp.series(
    "clean", // удаляем папку build
    "copy", // копируем необходимые файлы в папку build
    // "sprite", // создаем svg спрайт
    // "sprite2",
    // "sprite3",
    // "image", // оптимизируем изображения
    // "webp",   // конвертируем в webp

    "css", // собираем css
    "minifyjs", // минификация js
    "html" // собираем html
));

// Запускаем локальный сервер для разработки
gulp.task("server", function() {
    browserSync.init({
        server: "./build", // каталог который слушаем
        port: 3000, // порт
        notify: false, // уведомление
        open: true, // url по умолчанию
        cors: true, //
        ui: false // доступ к пользовательскому интерфейсу
    });

    gulp.watch("./source/img/**/icon-*.svg", gulp.series("sprite", "html")).on("change", browserSync.reload);
    // gulp.watch("./source/img/**/about-icon*.svg", gulp.series("sprite3", "html")).on("change", browserSync.reload);
    // gulp.watch("./source/img/**/number-icon*.svg", gulp.series("sprite2", "html")).on("change", browserSync.reload);

    gulp.watch("./source/img/**/*.{png,jpg,svg}", gulp.series("image")).on("change", browserSync.reload);
    gulp.watch("./source/img/**/*.{png,jpg,svg}", gulp.series("copy")).on("change", browserSync.reload);
    gulp.watch("./source/js/*.js", { usePolling: true }, gulp.series("minifyjs")).on("change", browserSync.reload);
    gulp.watch("./source/js/modules/*.js", { usePolling: true }, gulp.series("minifyjs")).on("change", browserSync.reload);
    gulp.watch("./source/sass/**/*.{sass,scss}", { usePolling: true }, gulp.series("css"));
    gulp.watch("./source/components/**", gulp.series("html")).on("change", browserSync.reload);
    gulp.watch("./source/*.html", gulp.series("html")).on("change", browserSync.reload);
    // gulp.watch("./source/video/**/**", gulp.series("copy")).on("change", browserSync.reload);
});

gulp.task("start", gulp.series("build", "server"));