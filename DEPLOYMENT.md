# Deploying the Bibliography App to bibliography.asafarim.com

This document provides step-by-step instructions for deploying the ASafariM Bibliography app to the bibliography.asafarim.com subdomain.

## Prerequisites

- Access to the ASafariM server
- SSH access to the server
- Sudo privileges on the server
- Git repository access

## Deployment Steps

### 1. Prepare the Server

First, create the necessary directories on the server:

```bash
# Connect to your server
ssh user@your-server

# Create the bibliography directory
sudo mkdir -p /var/www/asafarim-bibliography/public_html
sudo mkdir -p /var/www/asafarim/backups/bibliography

# Set proper permissions
sudo chown -R www-data:www-data /var/www/asafarim-bibliography
sudo chmod -R 755 /var/www/asafarim-bibliography
```

### 2. Configure Nginx

Copy the Nginx configuration file to the server:

```bash
# From your local machine
scp D:/repos/ASafariM/nginx/asafarim-bibliography.conf user@your-server:/tmp/

# On the server
sudo mv /tmp/asafarim-bibliography.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/asafarim-bibliography.conf /etc/nginx/sites-enabled/
```

### 3. Set Up SSL Certificate (if needed)

If you need to update the SSL certificate to include the bibliography.asafarim.com subdomain:

```bash
sudo certbot --expand -d asafarim.com,www.asafarim.com,blog.asafarim.com,bibliography.asafarim.com
```

### 4. Update DNS Records

Add a new DNS record for the bibliography.asafarim.com subdomain:

- Type: A
- Name: bibliography
- Value: [Your server IP address]
- TTL: 3600 (or as appropriate)

### 5. Deploy Using the Publish Script

You can deploy the bibliography app using one of the following methods:

#### Method 1: Using the publish.sh script

```bash
# On the server
cd /var/www/asafarim
bash publish.sh
# Select option 5 for Bibliography deployment
```

#### Method 2: Using the yarn script

```bash
# On the server
cd /var/www/asafarim
yarn asafarim-bibliography:publish
```

### 6. Verify the Deployment

After deployment, verify that the bibliography app is accessible at https://bibliography.asafarim.com

## Troubleshooting

### Nginx Configuration Issues

If you encounter issues with the Nginx configuration:

```bash
# Test the Nginx configuration
sudo nginx -t

# If there are no errors, restart Nginx
sudo systemctl restart nginx
```

### Build or Deployment Failures

If the build or deployment fails:

1. Check the logs in `/var/www/asafarim/logs/`
2. Ensure all directories have the correct permissions
3. Verify that the build process completes successfully

### SSL Certificate Issues

If you encounter SSL certificate issues:

```bash
# Check the certificate status
sudo certbot certificates

# Renew certificates if needed
sudo certbot renew --dry-run
```

## Maintenance

### Regular Updates

To update the bibliography app:

```bash
# Pull the latest changes
cd /var/www/asafarim
git pull origin main

# Redeploy
yarn asafarim-bibliography:publish
```

### Backup and Restore

The deployment process automatically creates backups before each deployment. To restore from a backup:

```bash
# List available backups
ls -la /var/www/asafarim/backups/bibliography/

# Extract a specific backup
sudo tar -xzf /var/www/asafarim/backups/bibliography/asafarim-bibliography_backup_YYYYMMDD_HHMMSS.tar.gz -C /var/www/asafarim-bibliography/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/asafarim-bibliography
sudo chmod -R 755 /var/www/asafarim-bibliography

# Restart Nginx
sudo systemctl restart nginx
