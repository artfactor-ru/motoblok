document.addEventListener("DOMContentLoaded", function(event) {
    if (document.querySelector('.dealers__stores-list')) {
        class DealersMap {
            constructor(arrData) {
                this.$regionSelector = document.querySelector('.region-choose');
                this.$citySelector = document.querySelector('.city-choose');
                this.$dealersOutput = document.querySelector('.dealers__stores-list');
                this.dealersArr = arrData.dealers;
                this.itemTemplate = function (el, wrap) {
                    let elemOutput = `
            <li class="item" data-reg="${el.region}">
                <span class="item__city">г. ${el.name}</span>
                <span class="item__name">${el.shopName}</span>
                <p class="item__address">${el.address}</p>
                <div class="item__numbers">
                    <a href="tel:${el.phone}">${el.phone}</a>
                </div>
                <a href="tel:${el.mail}" class="item__mail">${el.mail}</a>
            </li>`;
                    wrap.insertAdjacentHTML('beforeend', elemOutput);
                };
                this.onLoad();
                this.filterRegion();
                this.filterCity();
            }
            onLoad() {
                this.dealersArr.forEach(el =>  {
                    this.itemTemplate(el, this.$dealersOutput);
                })

                let filteredCities = [...new Set(this.dealersArr.map(a => a.name))];

                let allCitiesOption = `<option value="all">Все города</option>`;
                this.$citySelector.insertAdjacentHTML('beforeend', allCitiesOption)

                filteredCities.forEach(el => {
                    let option = `<option value="${el}">${el}</option>`
                    this.$citySelector.insertAdjacentHTML('beforeend', option)
                })
                // console.log(this.$citySelector.innerHTML);
            }
            filterRegion() {
                let data = this.dealersArr;
                let outputFunc = this.itemTemplate;
                const container = this.$dealersOutput;
                let citiesList = this.$citySelector;
                // console.log(data);
                this.$regionSelector.addEventListener('change', function (e) {
                    let currentRegion = this.value
                    container.innerHTML = "";

                    if (currentRegion === 'all') {
                        data.forEach(el =>  {
                            outputFunc(el, container)
                        })

                        citiesList.innerHTML = '';

                        let allCitiesOption = `<option value="all">Все города</option>`;
                        citiesList.insertAdjacentHTML('beforeend', allCitiesOption);

                        let filteredCities = [...new Set(data.map(a => a.name))];
                        filteredCities.forEach(el => {
                            let option = `<option value="${el}">${el}</option>`
                            citiesList.insertAdjacentHTML('beforeend', option)
                        })

                    } else {
                        let filteredArray = data.filter(obj => obj.region === currentRegion);
                        let filteredCities = [...new Set(filteredArray.map(a => a.name))];
                        filteredArray.forEach(objItem => {
                            outputFunc(objItem, container)
                        });

                        citiesList.innerHTML = '';

                        let allCitiesOption = `<option value="all">Все города</option>`;
                        citiesList.insertAdjacentHTML('beforeend', allCitiesOption);

                        filteredCities.forEach(el => {
                            let option = `<option value="${el}">${el}</option>`
                            citiesList.insertAdjacentHTML('beforeend', option)
                        })
                    }
                })
            }
            filterCity() {
                const container = this.$dealersOutput;
                let data = this.dealersArr;
                let outputFunc = this.itemTemplate;

                this.$citySelector.addEventListener('change', function (e) {
                    let currentCity = this.value;
                    container.innerHTML = "";

                    if (currentCity === 'all') {
                        data.forEach(el =>  {
                            outputFunc(el, container)
                        })
                    } else {
                        let filteredArray = data.filter(obj => obj.name === currentCity);
                        filteredArray.forEach(objItem => {
                            outputFunc(objItem, container)
                        });
                    }
                })
            }
        }

        const dealersData = new DealersMap( {
            dealers: [
                {
                    name: 'Санкт-Петербург',
                    region: 'Ленинградская область',
                    shopName: 'Магазин «Электробензоинструмент»',
                    address: 'Ул. Политехническая, 13-15, ст.м. Площадь Мужества (в 5 минутах)',
                    phone: '8 (812) 297-77-11',
                    mail: 'spb-motoblok.ru'
                },
                {
                    name: 'Колпино',
                    region: 'Ленинградская область',
                    shopName: 'Магазин «Электробензоинструмент»',
                    address: 'Ул. Ленина, 33',
                    phone: '8 (812) 461-60-66',
                    mail: 'kama-instrument.ru'
                },
                {
                    name: 'Колпино',
                    region: 'Ленинградская область',
                    shopName: 'Магазин «Инструменты»',
                    address: 'Ул. Тверская, 36/9',
                    phone: '8 (812) 461-60-66',
                    mail: 'kama-instrument.ru'
                },
                {
                    name: 'Пушкин',
                    region: 'Ленинградская область',
                    shopName: 'Магазин «Инструменты»',
                    address: 'Ул. Тверская, 36/9',
                    phone: '8 (812) 461-60-66',
                    mail: 'kama-instrument.ru'
                },
                {
                    name: 'Москва',
                    region: 'Московская область',
                    shopName: 'Магазин «Инструменты»',
                    address: 'Ул. Тверская, 3/9',
                    phone: '8 (812) 461-60-66',
                    mail: 'kama-instrument.ru'
                },
                {
                    name: 'Балашиха',
                    region: 'Московская область',
                    shopName: 'Магазин «Инструмент»',
                    address: 'Ул. Тверская, 36/9',
                    phone: '8 (812) 461-60-66',
                    mail: 'kama-instrument.ru'
                },

            ]}
        );
    }
});



