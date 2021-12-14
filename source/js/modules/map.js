// Оптимизировать код карты

export function mapInit() {

    let mapsR = document.getElementById('yandexmapa');
    if (mapsR) {
        let lat = document.getElementById('lat').textContent;
        let lon = document.getElementById('lon').textContent;
        let name = document.getElementById('adress').textContent;
        let geo = [lat, lon];
        let lat2 = document.getElementById('lat2').textContent;
        let lon2 = document.getElementById('lon2').textContent;
        let name2 = document.getElementById('adress2').textContent;
        let geo2 = [lat2, lon2];
        let map;
        let tag;
        if (typeof(ymaps) == 'undefined') {
            tag = document.createElement('script');
            tag.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            tag.onload = function() {
                ymaps.ready(init);
            }
        } else {
            ymaps.ready(init);
        }



        function init() {

            // ymaps.ready(function() {
            map = new ymaps.Map(mapsR, {
                center: [59.963787, 30.291694],
                // center: geo,
                zoom: 13
            });

            var myGeoObjects = [];

            myGeoObjects[0] = new ymaps.Placemark(geo, {
                hintContent: name,
            }, {
                iconImageHref: './img/pin.svg',

                iconImageSize: [32, 32],
                iconLayout: 'default#image'
                    // iconLayout: animatedLayout,
            });

            myGeoObjects[1] = new ymaps.Placemark(geo2, {
                hintContent: name2,
            }, {
                iconImageHref: './img/pin.svg',

                iconImageSize: [32, 32],
                iconLayout: 'default#image'
                    // iconLayout: animatedLayout,
            });
            let flagClick = false;
            let flagClick2 = false;
            const map1 = document.getElementById('map1');
            const map2 = document.getElementById('map2');
            myGeoObjects[0].events.add('click', function(e) {
                map2.classList.remove('active');
                map1.classList.add('active');

                map2.classList.add('unactive');
                map1.classList.remove('unactive');

                map2.classList.remove('first');
                myGeoObjects[0].options.set("iconImageSize", [40, 40]);
                myGeoObjects[0].options.set("iconImageHref", './img/pin-blue.svg');
                myGeoObjects[1].options.set("iconImageSize", [32, 32]);
                myGeoObjects[1].options.set("iconImageHref", './img/pin.svg');
                flagClick = true;
                flagClick2 = false;

            });
            myGeoObjects[1].events.add('click', function() {
                map2.classList.add('active');
                map1.classList.remove('active');
                map2.classList.remove('unactive');
                map1.classList.add('unactive');
                map2.classList.remove('first');
                myGeoObjects[0].options.set("iconImageSize", [32, 32]);
                myGeoObjects[0].options.set("iconImageHref", './img/pin.svg');
                myGeoObjects[1].options.set("iconImageSize", [40, 40]);
                myGeoObjects[1].options.set("iconImageHref", './img/pin-blue.svg');
                flagClick2 = true;
                flagClick = false;

            });

            if (map1) {
                map1.addEventListener('click', function() {
                    map2.classList.remove('active');
                    map1.classList.add('active');
                    map2.classList.add('unactive');
                    map1.classList.remove('unactive');
                    map2.classList.remove('first');
                    myGeoObjects[0].options.set("iconImageSize", [40, 40]);
                    myGeoObjects[0].options.set("iconImageHref", './img/pin-blue.svg');
                    myGeoObjects[1].options.set("iconImageSize", [32, 32]);
                    myGeoObjects[1].options.set("iconImageHref", './img/pin.svg');

                    flagClick = true;
                })
            }

            if (map2) {
                map2.addEventListener('click', function() {
                    map2.classList.add('active');
                    map1.classList.remove('active');
                    map2.classList.remove('unactive');
                    map1.classList.add('unactive');
                    map2.classList.remove('first');
                    myGeoObjects[0].options.set("iconImageSize", [32, 32]);
                    myGeoObjects[0].options.set("iconImageHref", './img/pin.svg');
                    myGeoObjects[1].options.set("iconImageSize", [40, 40]);
                    myGeoObjects[1].options.set("iconImageHref", './img/pin-blue.svg');

                    flagClick2 = true;
                })
            }

            myGeoObjects[0].events.add('mouseenter', function() {

                myGeoObjects[0].options.set("iconImageHref", './img/pin-blue.svg');

            })

            myGeoObjects[1].events.add('mouseenter', function() {
                myGeoObjects[1].options.set("iconImageHref", './img/pin-blue.svg');

            })

            myGeoObjects[0].events.add('mouseleave', function() {
                if (!flagClick) {
                    myGeoObjects[0].options.set("iconImageHref", './img/pin.svg');
                }


            })

            myGeoObjects[1].events.add('mouseleave', function() {
                    if (!flagClick2) {
                        myGeoObjects[1].options.set("iconImageHref", './img/pin.svg');
                    }
                })
                // myGeoObjects[1].events.click();

            var clusterIcons = [{
                href: './img/pin.svg',
                size: [64, 64],
                offset: [0, 0]
            }];

            var clusterer = new ymaps.Clusterer({
                clusterDisableClickZoom: false,
                clusterOpenBalloonOnClick: false,
                // Устанавливаем стандартный макет балуна кластера "Карусель".
                clusterBalloonContentLayout: 'cluster#balloonCarousel',
                // Устанавливаем собственный макет.
                //clusterBalloonItemContentLayout: customItemContentLayout,
                // Устанавливаем режим открытия балуна. 
                // В данном примере балун никогда не будет открываться в режиме панели.
                clusterBalloonPanelMaxMapArea: 0,
                // Устанавливаем размеры макета контента балуна (в пикселях).
                clusterBalloonContentLayoutWidth: 300,
                clusterBalloonContentLayoutHeight: 200,
                // Устанавливаем максимальное количество элементов в нижней панели на одной странице
                clusterBalloonPagerSize: 5
                    // Настройка внешего вида нижней панели.
                    // Режим marker рекомендуется использовать с небольшим количеством элементов.
                    // clusterBalloonPagerType: 'marker',
                    // Можно отключить зацикливание списка при навигации при помощи боковых стрелок.
                    // clusterBalloonCycling: false,
                    // Можно отключить отображение меню навигации.
                    // clusterBalloonPagerVisible: false
            });

            clusterer.add(myGeoObjects);
            map.geoObjects.add(clusterer);
            map.behaviors.disable('scrollZoom');
            // map.behaviors.disable('multiTouch');
            map.behaviors.disable('drag');

            mapsR.addEventListener('click', function() {
                map.behaviors.enable('drag');
                map.behaviors.disable('scrollZoom');
            })



        }

        // };
    }
}