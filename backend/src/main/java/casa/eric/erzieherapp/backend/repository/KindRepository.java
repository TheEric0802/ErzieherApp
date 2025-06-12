package casa.eric.erzieherapp.backend.repository;

import casa.eric.erzieherapp.backend.model.Kind;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KindRepository extends MongoRepository<Kind, String> {
    List<Kind> findByGruppeId(String gruppeId);
}
