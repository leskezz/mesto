const renderLoading = ({button, isLoading, initialText}) => {
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = initialText;
    }
}

export {renderLoading};