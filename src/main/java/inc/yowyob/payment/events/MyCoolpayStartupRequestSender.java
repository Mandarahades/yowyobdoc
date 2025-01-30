package inc.yowyob.payment.events;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import com.nimbusds.jose.shaded.gson.Gson;
import inc.yowyob.payment.entities.MyCoolPayData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyCoolpayStartupRequestSender implements ApplicationListener<ApplicationReadyEvent> {

    private String targetUrl;

    private String data;

    private String transactionRef;
    
    public MyCoolpayStartupRequestSender(String targetUrl, String data, String transactionRef){
        this.targetUrl = targetUrl;
        this.data = data;
        this.transactionRef = transactionRef;
    }

    private Gson gson = new Gson();

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        RestTemplate restTemplate = new RestTemplate();

        // Créer les en-têtes de la requête
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Créer l'entité HTTP avec les en-têtes et le corps
        HttpEntity<String> request = new HttpEntity<>(data, headers);

        // Envoyer la requête POST et récupérer la réponse
        String response = restTemplate.postForObject(targetUrl, request, String.class);

        // Afficher la réponse
        System.out.println(response);

        MyCoolPayData myCoolPayData = gson.fromJson(response, MyCoolPayData.class);

        this.transactionRef = myCoolPayData.getTransactionRef();
    }

}
