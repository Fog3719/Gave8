document.addEventListener('DOMContentLoaded', function() {
    const openDialogButtons = document.querySelectorAll('[data-dialog]');
    const closeDialogButtons = document.querySelectorAll('#closeDialogButton');
    const body = document.body;

    //console.log('Open buttons:', openDialogButtons.length);
   // console.log('Close buttons:', closeDialogButtons.length);

    // 打开对话框
    openDialogButtons.forEach(button => {
                button.addEventListener('click', function() {
            const dialogId = button.getAttribute('data-dialog');
            const dialog = document.getElementById(dialogId);
            dialog.classList.remove('hidden');
            body.style.overflow = 'hidden';
        });
    });

    // 关闭对话框
    closeDialogButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dialog = button.closest('.fixed');
            dialog.classList.add('hidden');
            body.style.overflow = '';
        });
    });

    // 点击对话框外部关闭对话框
    document.addEventListener('click', function(event) {
        const dialogs = document.querySelectorAll('.fixed');
        dialogs.forEach(dialog => {
            if (!dialog.classList.contains('hidden') && !dialog.contains(event.target) && !event.target.closest('[data-dialog]')) {
                dialog.classList.add('hidden');
                body.style.overflow = '';
            }
        });
    });

    // 阻止对话框内部元素的点击事件冒泡
    document.querySelectorAll('.fixed').forEach(dialog => {
        dialog.addEventListener('click', function(event) {
            if (event.target === this) {
                this.classList.add('hidden');
                body.style.overflow = '';
            } else {
            event.stopPropagation();
            }
        });
    });
});
