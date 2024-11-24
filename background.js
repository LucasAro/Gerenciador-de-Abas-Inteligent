// Tempo limite para fechar abas inativas (em minutos)
const INACTIVITY_LIMIT = 5; // 5 minutos

// Registro de última interação das abas
const tabTimers = {};

// Função: Reseta o timer de uma aba
function resetTabTimer( tabId )
{
	if ( tabId )
	{
		tabTimers[tabId] = Date.now();
	}
}

// Função: Remove o timer de uma aba quando ela é fechada
function clearTabTimer( tabId )
{
	delete tabTimers[tabId];
}

// Listener: Reseta o timer ao alternar para uma nova aba
chrome.tabs.onActivated.addListener( ( activeInfo ) =>
{
	console.log( "Tab ativada:", activeInfo.tabId );
	resetTabTimer( activeInfo.tabId );
} );

// Listener: Reseta o timer quando a aba é atualizada
chrome.tabs.onUpdated.addListener( ( tabId, changeInfo ) =>
{
	console.log( "Tab atualizada:", tabId, changeInfo );
	if ( changeInfo.status === "complete" )
	{
		console.log( "Tab carregada completamente:", tabId );
		resetTabTimer( tabId );
	}
} );

// Listener: Remove o timer quando uma aba é fechada
chrome.tabs.onRemoved.addListener( ( tabId ) =>
{
	console.log( "Tab fechada:", tabId );
	clearTabTimer( tabId );
} );

// Alarme para verificar abas inativas a cada minuto
chrome.alarms.create( "checkInactiveTabs", { periodInMinutes: 1 } );

// Função para obter o limite de inatividade (padrão: 5 minutos)
function getInactivityLimit( callback )
{
	console.log( "Obtendo limite de inatividade..." );
	chrome.storage.local.get( ["inactivityLimit"], ( result ) =>
	{
		callback( result.inactivityLimit || 5 ); // Default: 5 minutos
	} );
}
// Função para obter a aba ativa no momento
function getActiveTab( callback )
{
	chrome.tabs.query( { active: true, currentWindow: true }, ( tabs ) =>
	{
		if ( tabs.length > 0 )
		{
			callback( tabs[0].id );
		} else
		{
			callback( null );
		}
	} );
}

// Listener: Fecha abas que estiverem inativas além do limite
chrome.alarms.onAlarm.addListener( ( alarm ) =>
{
	if ( alarm.name === "checkInactiveTabs" )
	{
		getInactivityLimit( ( inactivityLimit ) =>
		{
			const now = Date.now();
			const inactivityLimitMs = inactivityLimit * 60 * 1000;

			getActiveTab( ( activeTabId ) =>
			{
				chrome.tabs.query( {}, ( tabs ) =>
				{
					tabs.forEach( ( tab ) =>
					{
						const lastActiveTime = tabTimers[tab.id];

						// Só fecha abas que não estão ativas e estão inativas
						if (
							tab.id !== activeTabId &&
							lastActiveTime &&
							now - lastActiveTime > inactivityLimitMs
						)
						{
							chrome.tabs.remove( tab.id, () =>
							{
								clearTabTimer( tab.id );
							} );
						}
					} );
				} );
			} );
		} );
	}
} );
