import { TestBed } from '@angular/core/testing';
import { CheckValueService } from './checkValue.service';

describe('Check value service', () => {
    let service: CheckValueService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CheckValueService]
        })

        service = TestBed.inject(CheckValueService)
    })

    it('should create class', () => {
        expect(service).toBeTruthy()
    })

    it('should examine value', () => {
        const value = service.check();
        expect(value).toBeTruthy()
    })
})