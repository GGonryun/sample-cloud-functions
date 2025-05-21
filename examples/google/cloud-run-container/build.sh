# gcloud artifacts repositories create event-logger-repo --repository-format=docker --location=us-central1 
# gcloud auth configure-docker us-central1-docker.pkg.dev

gcloud builds submit -t $REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$IMAGE_NAME .

gcloud run deploy $IMAGE_NAME --image $REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$IMAGE_NAME --platform managed --region $REGION --allow-unauthenticated