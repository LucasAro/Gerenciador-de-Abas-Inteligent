// Carregar o limite de inatividade salvo ao abrir o popup
document.addEventListener( "DOMContentLoaded", () =>
{
	chrome.storage.local.get( ["inactivityLimit"], ( result ) =>
	{
		const inactivityLimit = result.inactivityLimit || 5; // Padrão: 5 minutos
		document.getElementById( "inactivityLimit" ).value = inactivityLimit;
	} );
} );

// Salvar o limite de inatividade
document.getElementById( "saveLimit" ).addEventListener( "click", () =>
{
	const inactivityLimit = parseInt( document.getElementById( "inactivityLimit" ).value );

	if ( isNaN( inactivityLimit ) || inactivityLimit < 1 )
	{
		document.getElementById( "status" ).innerText = "Por favor, insira um valor válido!";
		return;
	}

	// Salvar no armazenamento da extensão
	chrome.storage.local.set( { inactivityLimit }, () =>
	{
		document.getElementById( "status" ).innerText = `Limite de inatividade definido para ${inactivityLimit} minutos.`;
	} );
} );

// Salvar a sessão de abas abertas
document.getElementById( "saveSession" ).addEventListener( "click", () =>
{
	chrome.tabs.query( {}, ( tabs ) =>
	{
		const tabUrls = tabs.map( ( tab ) => tab.url );

		// Salvar URLs no armazenamento
		chrome.storage.local.set( { savedSession: tabUrls }, () =>
		{
			document.getElementById( "status" ).innerText = "Sessão salva com sucesso!";
		} );
	} );
} );
