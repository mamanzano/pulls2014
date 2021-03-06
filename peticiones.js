debugger 
var org = "mejorandola";

$.getJSON("https://api.github.com/orgs/"+org+"?callback=?",org_info);

function org_info (data){
	var num_members;
		data = data.data;

		view = {
			name : data.name,
			email : data.email,
			num_repos : data.public_repos,
			url : data.html_url
		}

		url_repos = data.repos_url;
		url_members = data.members_url.replace("{/member}", "");

		$.getJSON(url_members, members_info);
		$.getJSON(url_repos, repo_info); 
}

function members_info (member){
	view.num_members = member.length;

	template = "<a href={{url}}><h2>{{name}}</h2></a>"+
                "<p>Repositorios: {{num_repos}}</p>"+
                "<p>Miembros: {{num_members}}</p>"+
                "<p>email: <a href='mailto:{{email}}'>{{email}}</a></p>";

    output = Mustache.render(template, view);

    $("#repoinfo").html(output);
}

function repo_info(repos) {
    repos.forEach(function (repo){
        repo_contents = repo.contents_url.replace("{+path}","");
        view = {
            name : repo.name,
            git_url : repo.html_url,
            description : repo.description
        }
        if (view.description == ""){
            view.description = "Repositorio Oficial";
        }
        template = "<div class='repo' id='{{name}}'>"+
                "<h3>{{name}}</h3>"+
                "<a class='github' href='{{git_url}}'>Miralo en Github</a>"+
                "<p>{{description}}</p></div>";
        output = Mustache.render(template, view);
        $("#repositorios").prepend(output);
    });
}