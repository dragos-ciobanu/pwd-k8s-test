##Kubernetes cluster mimicking a Service Mesh.

**Component Services**
* Frontend  - accept a password in an input
* Calculate the strength of a password
* Check a password against a list of weak passwords
* Check if a password was used before


### Prerequisites
* Minikube

### Start the cluster
    minikube start

### Create the kubernetes config
    kubectl apply -f ./k8s_config

### kubectl get commands

    kubectl get pod
    kubectl get pod -o wide
    kubectl get service

### give a URL to external service in minikube

    minikube service frontend-service
