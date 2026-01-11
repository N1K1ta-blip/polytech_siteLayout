const onOpenParticipant = (id) => {
    const table = document.querySelector(`#competition_table_${id}`)
    const button = document.querySelector(`#competition_button_${id}`)

    if (window.getComputedStyle(table).display === 'none') {
        table.style.display = 'table'
        button.textContent = 'Свернуть список участников'
    } else {
        table.style.display = 'none'
        button.textContent = 'Развернуть список участников'
    }
}