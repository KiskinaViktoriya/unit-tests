import { TestBed } from '@angular/core/testing';
import { CheckValueService } from './checkValue.service';
import { SumService } from './sum.service';

describe('Sum service', () => {
    let service: SumService;
    const fakeCheckValueService = { check: () => true }

    beforeEach(() => {
        //service = new SumService(fakeCheckValueService as CheckValueService);
        TestBed.configureTestingModule({
            providers: [
                SumService,
                { provide: CheckValueService, useValue: fakeCheckValueService }
            ]
        })

        service = TestBed.inject(SumService)
    })

    it('should create class', () => {
        expect(service).toBeTruthy()
    })

    it('should summary 1 + 2', () => {
        const sum = service.sum(1, 2)
        expect(sum).toBe(3)
    })

    it('should return undefined', () => {
        const sum = service.sum(1)
        expect(sum).toBeUndefined()
    })

    it('should check', () => {
        const value = service.check();
        expect(value).toBeTruthy()
    })
})