import { buildChartData, mapStateToProps } from '../CpuUtilizationWidget';
import { ResourceConsumption_resourceConsumption } from '../qraphql/__generated__/resourceConsumption';
import { mockGraphQLError, createMockedState } from '../../../../common/mock/MockData';

const dataDev: ResourceConsumption_resourceConsumption[] = [
    {
        __typename: 'ResourceConsumptionDTO',
        projectId: 'nf1bkafm142j',
        resourceType: 'CPU',
        usage: '0.0342',
        usageDate: '2019-07-06T00:00'
    }
];

const dataProd: ResourceConsumption_resourceConsumption[] = [
    {
        __typename: 'ResourceConsumptionDTO',
        projectId: 'mt4iu9fcvap4',
        resourceType: 'CPU',
        usage: '0.0627',
        usageDate: '2019-07-06T00:00'
    }
];

const mockDevData = {
    error: mockGraphQLError.message,
    loading: false,
    resourceConsumption: dataDev
};

const mockProdData = {
    error: mockGraphQLError.message,
    loading: false,
    resourceConsumption: dataProd
};

const buildDataExpectedResults = {
    labels: ['Dev', 'Prod', 'Not used'],
    datasets: [
        {
            label: 'Dev',
            data: [3.42, 96.58],
            backgroundColor: ['#0c3d8a', '#D8DADA']
        },
        {
            label: 'Prod',
            data: [6.2700000000000005, 93.73],
            backgroundColor: ['#859ec4', '#D8DADA']
        }
    ]
};

describe('when `buildChartData` is called', () => {
    it('should return the correct result', () => {
        expect(buildChartData(dataDev, dataProd)).toMatchObject(buildDataExpectedResults);
    });
});

describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
        const expectedResult = JSON.stringify({
            dataDev,
            dataProd,
            loadingDev: false,
            loadingProd: false,
            errorDev: mockGraphQLError.message,
            errorProd: mockGraphQLError.message
        });
        const result = JSON.stringify(
            mapStateToProps(createMockedState(), {
                dev: { loading: false, error: mockGraphQLError, resourceConsumption: mockDevData.resourceConsumption },
                prod: { loading: false, error: mockGraphQLError, resourceConsumption: mockProdData.resourceConsumption }
            })
        );
        expect(result).toEqual(expectedResult);
    });
});
