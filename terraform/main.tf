# --- INFRASTRUCTURE AS CODE (Row 7) ---
# This defines the AWS infrastructure for SyncSpace

provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "syncspace_sg" {
  name        = "syncspace_sg"
  description = "Allow Web Traffic"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # In real life, restrict this IP
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 20.04 LTS
  instance_type = "t3.micro"
  key_name      = "deploy-key"
  
  security_groups = [aws_security_group.syncspace_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io docker-compose
              git clone https://github.com/your-user/sync-space.git /app
              cd /app
              docker-compose up -d
              EOF

  tags = {
    Name = "SyncSpace-Production"
  }
}
