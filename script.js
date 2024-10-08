document.addEventListener('DOMContentLoaded', function() {
    const monthSelection = document.getElementById("monthSelection");
    
    let currentDate = new Date();
    
    // Define o valor inicial do campo de seleção de mês para o mês atual
    monthSelection.value = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
});

function gerarCalendario() {
    const calendar = document.getElementById("calendar");
    const month = document.getElementById("monthSelection").value;
    const quantity = document.getElementById("quantitySelector").value;
    const names = document.getElementById("namesSelector").value.split(",");

    calendar.innerHTML = ''; // Limpa o calendário antes de gerar

    // Extrai ano e mês da seleção
    const [year, monthSelected] = month.split('-');
    const monthName = new Date(year, monthSelected - 1).toLocaleString('pt-BR', { month: 'long' });
    const formatedMonth = monthName.charAt(0).toLocaleUpperCase() + monthName.slice(1);

    // Gerar 'n' calendários com base na quantidade selecionada
    for (let i = 0; i < quantity; i++) {
        const firstDay = new Date(year, monthSelected - 1, 1);
        const lastDay = new Date(year, monthSelected, 0);
        const name = names[i] || "N/A";

        let table = `<table border='1'>
                        <th colspan="5" style="font-size: x-large;">${formatedMonth} de ${year}</th>
                        <th colspan="2" style="font-size: large;">De: ${name}</th>
                        <tr>`;
        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        // Cabeçalho com dias da semana
        for (let day of daysOfWeek) {
            table += `<th>${day}</th>`;
        }
        table += "</tr><tr>";

        // Preenche os dias em branco antes do primeiro dia do mês
        for (let j = 0; j < firstDay.getDay(); j++) {
            table += "<td></td>";
        }

        // Preenche os dias do mês com textarea fixa
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const currentDay = new Date(year, monthSelected - 1, day).getDay(); // Obtém o dia da semana (0 = Domingo, 6 = Sábado)
        
            table += `<td>
                        <div style="justify-content: end; display: flex; font-weight: bold; margin-right: 4px;">${day}</div>`;
            
            // Verifica se é Sábado (6) ou Domingo (0)
            if (currentDay === 0 || currentDay === 6) {
                // Se for Sábado ou Domingo, não adiciona a textarea
                table += `<div style="width: 125px; height: 75px;"></div>`;
                table += `</td>`;
            } else {
                // Para os dias da semana (Segunda a Sexta), adiciona a textarea
                table += `<textarea style="width: 125px; height: 75px; font-size: smaller; resize: none; text-align: center;"></textarea>`;
                table += `</td>`;
            }
        
            if ((firstDay.getDay() + day) % 7 === 0) {
                table += "</tr><tr>";
            }
        }        

        table += "</tr></table>";

        // Adiciona o calendário gerado
        calendar.innerHTML += table;
    }
}