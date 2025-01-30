package inc.yowyob.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.cassandra.config.EnableCassandraAuditing;

@SpringBootApplication
@EnableDiscoveryClient
@EnableAutoConfiguration
@ComponentScan(basePackages = {
    "inc.yowyob.scylladb",
    "inc.yowyob.payment.*",
    "inc.yowyob.identity.*",
    "inc.yowyob.openapi.*",
    "inc.yowyob.starter.core.*",
    "inc.yowyob.oauth.client.*",})
@EnableCassandraAuditing
@RefreshScope
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
