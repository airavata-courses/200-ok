kubeadm init --pod-network-cidr=192.168.0.0/16
mkdir -p $HOME/.kube
kubectl get nodes
echo 'applying calico'
kubectl apply -f https://docs.projectcalico.org/v3.3/getting-started/kubernetes/installation/hosted/rbac-kdd.yaml
kubectl apply -f https://docs.projectcalico.org/v3.3/getting-started/kubernetes/installation/hosted/kubernetes-datastore/calico-networking/1.7/calico.yaml
kubectl get nodes