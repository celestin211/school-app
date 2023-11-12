import  "../dataTables/dataTables";
import { oLanguage_fr } from "../languages/langue-fr";

$(function () {
	// customDatatable('.signac-datatable');
	
	
	$('#listeCours').DataTable( {
		oLanguage: oLanguage_fr(),
		"processing": true,
		"serverSide": true,
		"stateSave": true,
		"fixedHeader": true,
		"responsive": true,
		"search": {
			return: true
		},
		"ajax": {
			"url": "cours-pagination",
			"type": "POST"
		},
		
	} );
	
	$(function(){
		$('.utilisateur').click(function(){
			$('#nav').toggleClass('open');
		});
	});
});