const fileConfig = (root, domain) => {
    return `
	listen   80;
	root ${root};
	index index.php index.html index.htm;
	server_name ${domain};
	# serve static files directly
	location ~* \.(jpg|jpeg|gif|css|png|js|ico|html)$ {
		access_log off;
		expires max;
	}
	# removes trailing slashes (prevents SEO duplicate content issues)
	if (!-d \$request_filename) {
		rewrite ^/(.+)/\$ /\$1 permanent;
	}
	# unless the request is for a valid file (image, js, css, etc.), send to bootstrap
		if (!-e \$request_filename) {
			rewrite ^/(.*)\$ /index.php?/\$1 last;
			break;
		}
	# removes trailing 'index' from all controllers
	if (\$request_uri ~* index/?\$) {
		rewrite ^/(.*)/index/?\$ /\$1 permanent;
	}
	# catch all
	error_page 404 /index.php;
	location ~ \.php$ {
		fastcgi_split_path_info ^(.+\.php)(/.+)\$;
		fastcgi_pass 127.0.0.1:9000;
		fastcgi_index index.php;
		include fastcgi_params;
	}
	location ~ /\.ht {
		deny all;
	}
	`
}

module.exports =  fileConfig;