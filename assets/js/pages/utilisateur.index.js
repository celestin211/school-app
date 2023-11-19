import  "../dataTables/dataTables";
import $ from  'jquery';
import { oLanguage_fr } from "../languages/langue-fr";

$(function () {
	// customDatatable('.signac-datatable');
	
	
	$('#listeUtilisateurs').DataTable( {
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
			"url": "pagination",
			"type": "POST"
		},
	
	} );
	
	$(function(){
		$('.utilisateur').click(function(){
			$('#nav').toggleClass('open');
		});
	});
});