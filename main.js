document.addEventListener('DOMContentLoaded', function() {
            // Получаем элементы загрузки файлов
            const uploadItem1 = document.getElementById('upload-item-1');
            const uploadItem2 = document.getElementById('upload-item-2');
            const fileInput1 = document.getElementById('file-input-1');
            const fileInput2 = document.getElementById('file-input-2');
            const paymentBtn = document.getElementById('payment-btn');
            const uploadStatusText = document.getElementById('upload-status-text');
            
            // Иконки для элементов загрузки
            const uploadIcon1 = document.getElementById('upload-icon-1');
            const uploadIcon2 = document.getElementById('upload-icon-2');
            
            // Элементы для отображения имен файлов
            const fileName1 = document.getElementById('file-name-1');
            const fileName2 = document.getElementById('file-name-2');
            
            // Функция для обновления статуса загрузки
            function updateUploadStatus() {
                const uploadedItems = document.querySelectorAll('.upload-item.uploaded').length;
                const totalItems = document.querySelectorAll('.upload-item').length;
                uploadStatusText.textContent = `${uploadedItems} из ${totalItems} загружено`;
                
                // Обновляем статус точек
                const statusDots = document.querySelectorAll('.status-dot');
                statusDots.forEach((dot, index) => {
                    if (index < uploadedItems) {
                        dot.classList.add('uploaded');
                    } else {
                        dot.classList.remove('uploaded');
                    }
                });
            }
            
            // Функция для обработки загрузки файла
            function handleFileUpload(uploadItem, fileInput, uploadIcon, fileName) {
                // Клик по элементу загрузки
                uploadItem.addEventListener('click', function(e) {
                    // Если клик был по самому input, не делаем ничего
                    if (e.target === fileInput) return;
                    fileInput.click();
                });
                
                // Изменение выбранного файла
                fileInput.addEventListener('change', function() {
                    if (fileInput.files.length > 0) {
                        const file = fileInput.files[0];
                        
                        // Обновляем иконку с плюса на PDF
                        uploadIcon.className = 'fas fa-file-pdf';
                        
                        // Показываем информацию о файле
                        fileName.textContent = file.name.length > 20 ? 
                            file.name.substring(0, 17) + '...' : file.name;
                        
                        // Добавляем класс uploaded для стилизации
                        uploadItem.classList.add('uploaded');
                        
                        // Обновляем статус загрузки
                        updateUploadStatus();
                        
                        // Проверяем, все ли файлы загружены
                        checkAllFilesUploaded();
                    } else {
                        // Если файл не выбран, сбрасываем состояние
                        if (uploadItem.id === 'upload-item-1') {
                            // Первый файл по умолчанию загружен
                            uploadIcon.className = 'fas fa-file-pdf';
                            uploadItem.classList.add('uploaded');
                            fileName.textContent = 'Заявление_1.pdf';
                        } else {
                            uploadIcon.className = 'fas fa-plus';
                            uploadItem.classList.remove('uploaded');
                            fileName.textContent = 'Файл не выбран';
                        }
                        updateUploadStatus();
                        checkAllFilesUploaded();
                    }
                });
            }
            
            // Проверка, все ли файлы загружены
            function checkAllFilesUploaded() {
                const uploadItems = document.querySelectorAll('.upload-item');
                let allUploaded = true;
                
                uploadItems.forEach(item => {
                    if (!item.classList.contains('uploaded')) {
                        allUploaded = false;
                    }
                });
                
                // Если все файлы загружены, активируем кнопку оплаты
                if (allUploaded) {
                    paymentBtn.disabled = false;
                    paymentBtn.style.backgroundColor = '#3498db';
                } else {
                    paymentBtn.disabled = true;
                    paymentBtn.style.backgroundColor = '#95a5a6';
                }
            }
            
            // Инициализация загрузки файлов
            handleFileUpload(uploadItem1, fileInput1, uploadIcon1, fileName1);
            handleFileUpload(uploadItem2, fileInput2, uploadIcon2, fileName2);
            
            // Обработка кнопки оплаты
            paymentBtn.addEventListener('click', function() {
                if (!paymentBtn.disabled) {
                    alert('Оплата апелляции выполнена успешно! Спасибо за использование нашего сервиса.');
                    // В реальном приложении здесь была бы перенаправление на платежную систему
                }
            });
            
            // Эмуляция клика по кнопкам скачивания
            const downloadBtns = document.querySelectorAll('.download-btn');
            downloadBtns.forEach((btn, index) => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const itemNumber = index + 1;
                    alert(`Заявление ${itemNumber} будет скачано. В реальном приложении здесь происходила бы загрузка файла PDF.`);
                });
            });
            
            // Эмуляция клика по карточкам скачивания
            const downloadItems = document.querySelectorAll('.download-item');
            downloadItems.forEach((item, index) => {
                item.addEventListener('click', function(e) {
                    if (!e.target.closest('.download-btn')) {
                        const itemNumber = index + 1;
                        alert(`Открывается предпросмотр заявления ${itemNumber}. В реальном приложении здесь открывался бы PDF файл.`);
                    }
                });
            });
            
            // Инициализируем статус загрузки
            updateUploadStatus();
        });