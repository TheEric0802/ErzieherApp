package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Kind;
import casa.eric.erzieherapp.backend.model.KindDTO;
import casa.eric.erzieherapp.backend.repository.KindRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class KindService {

    private final KindRepository kindRepository;
    private final IdService idService;

    public List<Kind> getAllKinder() {
        return kindRepository.findAll();
    }

    public Kind createKind(KindDTO kind) {
        return kindRepository.save(new Kind(idService.generateId(), kind.firstName(), kind.lastName(), kind.gruppe()));
    }

    public Kind updateKind(String id, KindDTO kind) {
        Kind kindToUpdate = kindRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Kind not found"));
        kindToUpdate = kindToUpdate.withFirstName(kind.firstName());
        kindToUpdate = kindToUpdate.withLastName(kind.lastName());
        kindToUpdate = kindToUpdate.withGruppe(kind.gruppe());
        return kindRepository.save(kindToUpdate);
    }

    public void deleteKind(String id) {
        if (!kindRepository.existsById(id)) {
            throw new NoSuchElementException("Kind not found");
        }
        kindRepository.deleteById(id);
    }
}
