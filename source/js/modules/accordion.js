(function accordion() {


    document.querySelectorAll('.accordion__item').forEach((element) => {

        element.querySelector('.accordion__title').addEventListener('click', function(event) {
            event.preventDefault();

            document.querySelectorAll('.accordion__item').forEach((element) => {
                if (event.target != element.querySelector('.accordion__title')) {
                    element.classList.remove('active');
                    element.querySelector('.accordion__info').style.maxHeight = '0px';
                }

            })

            element.classList.toggle('active');
            if (element.classList.contains('active')) {
                element.querySelector('.accordion__info').style.maxHeight = element.querySelector('.accordion__info-wrap').offsetHeight + 'px';
            } else {
                element.querySelector('.accordion__info').style.maxHeight = '0px';
            }
        })
    });

}())