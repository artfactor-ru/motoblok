document.querySelectorAll('form').forEach(element => {
    const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    const fileChooser = element.querySelector('input[type="file"]');
    const preview = element.querySelector('.file-preview');
    const removeIcon = element.querySelector('.remove-button');

    if (fileChooser) {

        fileChooser.addEventListener('change', function() {
            const file = fileChooser.files[0];
            const fileName = file.name.toLowerCase();

            const matches = FILE_TYPES.some(function(it) {
                return fileName.endsWith(it);
            });

            if (matches) {
                const reader = new FileReader();
                reader.addEventListener('load', function() {
                    preview.src = reader.result;
                    preview.style.opacity = "1";
                    removeIcon.style.display = 'flex';
                });
                reader.readAsDataURL(file);
            }
        });

        removeIcon.addEventListener('click', function() {
            removeIcon.style.display = 'none';
            preview.src = '';
            preview.style.opacity = "0";
            fileChooser.reset();
        });

    }
});